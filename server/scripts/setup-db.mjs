// 一键建库脚本:读取 .env 连接信息,执行 sql/schema.sql 与 sql/seed.sql
// 用法:在 server/.env 填好 DB_PASSWORD 后执行 npm run setup
import { readFile } from 'node:fs/promises'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const { DB_HOST = '127.0.0.1', DB_PORT = 3306, DB_USER = 'root', DB_PASSWORD, DB_NAME = 'yinkai_web' } = process.env
if (!DB_PASSWORD) {
  console.error('请先在 server/.env 中填写 DB_PASSWORD')
  process.exit(1)
}

const schema = await readFile(new URL('../sql/schema.sql', import.meta.url), 'utf8')
const seed = await readFile(new URL('../sql/seed.sql', import.meta.url), 'utf8')

const conn = await mysql.createConnection({ host: DB_HOST, port: +DB_PORT, user: DB_USER, password: DB_PASSWORD, multipleStatements: true })
try {
  for (const [name, sql] of [['schema', schema], ['seed', seed]]) {
    await conn.query(sql)
    console.log(`${name} 执行完成`)
  }
  const [rows] = await conn.query(
    `SELECT (SELECT COUNT(*) FROM \`${DB_NAME}\`.news) news,
            (SELECT COUNT(*) FROM \`${DB_NAME}\`.jobs) jobs,
            (SELECT COUNT(*) FROM \`${DB_NAME}\`.products) products,
            (SELECT COUNT(*) FROM \`${DB_NAME}\`.product_params) params,
            (SELECT COUNT(*) FROM \`${DB_NAME}\`.honors) honors,
            (SELECT COUNT(*) FROM \`${DB_NAME}\`.partners) partners`
  )
  console.log('数据校验:', rows[0])
} finally {
  await conn.end()
}
