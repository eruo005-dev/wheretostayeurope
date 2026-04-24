// apps/web/src/lib/db.ts
//
// Raw pg pool for queries against tables Payload does NOT manage — primarily
// `properties`, `internal_links`, and any aggregate / PostGIS query.
//
// Payload has its own connection pool; we use a separate one here because we
// need explicit control over statement timeouts and because Payload's pool is
// abstracted behind its client.

import { Pool, type PoolClient, type QueryResultRow } from "pg";

let pool: Pool | null = null;

function getPool(): Pool {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    statement_timeout: 10_000,          // kill runaway queries
    // Node pg uses parameter types inferred from placeholders; keep server-side casts explicit in SQL.
  });
  pool.on("error", (err) => {
    // eslint-disable-next-line no-console
    console.error("[db] pool error:", err);
  });
  return pool;
}

/** Single-shot query; auto-releases the connection. */
export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  const client = await getPool().connect();
  try {
    const res = await client.query<T>(sql, params as unknown[] | undefined);
    return res.rows;
  } finally {
    client.release();
  }
}

/** Transaction wrapper for multi-statement writes. */
export async function withTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

/** Convenience for Next.js route handlers — returns null if 0 rows. */
export async function queryOne<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: unknown[]
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}
