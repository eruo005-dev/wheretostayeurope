// apps/web/src/components/content/LexicalRenderer.tsx
//
// Minimal-but-production Lexical JSON → React serializer for Payload v3 rich text.
// Handles: paragraphs, headings, lists, links, inline formatting, blockquote,
// horizontal rules, inline code. Relationship links ("internal link to another
// Payload doc") render as Next.js <Link>. External links get rel="nofollow noopener"
// by default; affiliate links (detected via URL hostname match) get rel="sponsored
// nofollow noopener" and target="_blank".
//
// Anything we don't know how to render is silently skipped rather than crashing.
// Extend as needed; keep the switch exhaustive.

import Link from "next/link";
import { Fragment, type ReactNode } from "react";

type LexicalFormat = number; // bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code, 32=subscript, 64=superscript

type LexicalBaseNode = { type: string; version?: number; children?: LexicalNode[] };

type LexicalTextNode = LexicalBaseNode & {
  type: "text";
  text: string;
  format?: LexicalFormat;
};

type LexicalLinkNode = LexicalBaseNode & {
  type: "link" | "autolink";
  fields?: {
    url?: string;
    newTab?: boolean;
    linkType?: "custom" | "internal";
    doc?: { value: { id: string; slug?: string } | string; relationTo: string };
  };
};

type LexicalHeadingNode = LexicalBaseNode & { type: "heading"; tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" };
type LexicalListNode = LexicalBaseNode & { type: "list"; listType: "bullet" | "number"; start?: number };
type LexicalListItemNode = LexicalBaseNode & { type: "listitem" };
type LexicalParagraphNode = LexicalBaseNode & { type: "paragraph" };
type LexicalQuoteNode = LexicalBaseNode & { type: "quote" };
type LexicalHRNode = LexicalBaseNode & { type: "horizontalrule" };

type LexicalNode =
  | LexicalTextNode
  | LexicalLinkNode
  | LexicalHeadingNode
  | LexicalListNode
  | LexicalListItemNode
  | LexicalParagraphNode
  | LexicalQuoteNode
  | LexicalHRNode
  | LexicalBaseNode;

export type LexicalRoot = { root: { children: LexicalNode[] } };

const AFFILIATE_HOSTS = new Set([
  "booking.com", "www.booking.com",
  "getyourguide.com", "www.getyourguide.com",
  "agoda.com", "www.agoda.com",
  "hotels.com", "www.hotels.com",
  "expedia.com", "www.expedia.com",
  "airalo.com", "www.airalo.com",
  "safetywing.com", "www.safetywing.com",
  "heymondo.com", "www.heymondo.com",
  "viator.com", "www.viator.com",
]);

function isAffiliateUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return AFFILIATE_HOSTS.has(u.hostname.toLowerCase());
  } catch {
    return false;
  }
}

function applyFormat(text: string, format?: LexicalFormat, key?: string | number): ReactNode {
  if (!format) return text;
  let node: ReactNode = text;
  if (format & 16) node = <code key={`c-${key}`}>{node}</code>;
  if (format & 1) node = <strong key={`b-${key}`}>{node}</strong>;
  if (format & 2) node = <em key={`i-${key}`}>{node}</em>;
  if (format & 4) node = <s key={`s-${key}`}>{node}</s>;
  if (format & 8) node = <u key={`u-${key}`}>{node}</u>;
  if (format & 32) node = <sub key={`sb-${key}`}>{node}</sub>;
  if (format & 64) node = <sup key={`sp-${key}`}>{node}</sup>;
  return node;
}

function renderChildren(children: LexicalNode[] | undefined, locale: string): ReactNode {
  if (!children) return null;
  return children.map((child, i) => renderNode(child, locale, i));
}

function renderNode(node: LexicalNode, locale: string, key: string | number): ReactNode {
  switch (node.type) {
    case "text": {
      const t = node as LexicalTextNode;
      return <Fragment key={key}>{applyFormat(t.text, t.format, key)}</Fragment>;
    }
    case "paragraph": {
      return <p key={key}>{renderChildren(node.children, locale)}</p>;
    }
    case "heading": {
      const h = node as LexicalHeadingNode;
      const Tag = h.tag as keyof JSX.IntrinsicElements;
      return <Tag key={key}>{renderChildren(h.children, locale)}</Tag>;
    }
    case "list": {
      const l = node as LexicalListNode;
      const Tag = l.listType === "number" ? "ol" : "ul";
      return (
        <Tag key={key} start={l.start}>
          {renderChildren(l.children, locale)}
        </Tag>
      );
    }
    case "listitem": {
      return <li key={key}>{renderChildren(node.children, locale)}</li>;
    }
    case "quote": {
      return <blockquote key={key}>{renderChildren(node.children, locale)}</blockquote>;
    }
    case "horizontalrule": {
      return <hr key={key} />;
    }
    case "link":
    case "autolink": {
      const l = node as LexicalLinkNode;
      const fields = l.fields ?? {};
      const linkType = fields.linkType ?? "custom";

      if (linkType === "internal" && fields.doc) {
        const docValue = fields.doc.value;
        const slug =
          typeof docValue === "object" && docValue !== null
            ? (docValue.slug ?? String(docValue.id))
            : String(docValue);
        const href = `/${locale}/${fields.doc.relationTo}/${slug}`;
        return (
          <Link key={key} href={href}>
            {renderChildren(l.children, locale)}
          </Link>
        );
      }

      const url = fields.url ?? "#";
      const isAffiliate = isAffiliateUrl(url);
      const rel = isAffiliate
        ? "sponsored nofollow noopener"
        : "nofollow noopener";
      const target = fields.newTab || isAffiliate ? "_blank" : undefined;

      return (
        <a key={key} href={url} rel={rel} target={target}>
          {renderChildren(l.children, locale)}
        </a>
      );
    }
    default: {
      // Unknown block — render children transparently if present, otherwise skip.
      if (node.children) {
        return <Fragment key={key}>{renderChildren(node.children, locale)}</Fragment>;
      }
      return null;
    }
  }
}

type Props = {
  data: LexicalRoot | null | undefined;
  locale: string;
  className?: string;
};

export function LexicalRenderer({ data, locale, className }: Props) {
  if (!data?.root?.children?.length) return null;
  return (
    <div className={className}>
      {data.root.children.map((child, i) => renderNode(child, locale, i))}
    </div>
  );
}
