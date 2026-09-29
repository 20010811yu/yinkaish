import mysql from 'mysql2/promise'
import 'dotenv/config'

// 数据库连接池(只读站点接口,无需事务)
export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'yinkai_web',
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
})

export async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params)
  return rows
}
