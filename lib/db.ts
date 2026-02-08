import mysql from "mysql2/promise"
import dotenv from "dotenv"

// Force load .env.local
dotenv.config({ path: ".env.local" })

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`)
  }
  return value
}

let pool: mysql.Pool | null = null

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: requireEnv("DB_HOST"),
      user: requireEnv("DB_USER"),
      password: requireEnv("DB_PASS"),
      database: requireEnv("DB_NAME"),
      port: Number(requireEnv("DB_PORT")),
      waitForConnections: true,
      connectionLimit: 10,
    })
  }
  return pool
}

export async function query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const pool = getPool()
  const [rows] = await pool.execute(sql, params)
  return rows as T[]
}
