// 管理员账号体系迁移:建 admins 表并内置默认管理员(幂等,可重复执行)
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const { DB_HOST = '127.0.0.1', DB_PORT = 3306, DB_USER = 'root', DB_PASSWORD, DB_NAME = 'yinkai_web' } = process.env
if (!DB_PASSWORD) {
  console.error('请先在 server/.env 中填写 DB_PASSWORD')
  process.exit(1)
}

const conn = await mysql.createConnection({ host: DB_HOST, port: +DB_PORT, user: DB_USER, password: DB_PASSWORD, multipleStatements: true })
try {
  await conn.query(`USE \`${DB_NAME}\``)
  await conn.query(`CREATE TABLE IF NOT EXISTS admins (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '管理员编号(主键)',
  username VARCHAR(50) NOT NULL UNIQUE COMMENT '登录用户名',
  password_hash VARCHAR(100) NOT NULL COMMENT '密码哈希(bcrypt)',
  nickname VARCHAR(50) NOT NULL DEFAULT '' COMMENT '显示昵称',
  is_active TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否启用(1是 0禁用)',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员账号表-官网管理端登录'`)

  const [rows] = await conn.query('SELECT COUNT(*) AS n FROM admins')
  if (rows[0].n === 0) {
    const hash = bcrypt.hashSync('admin123', 10)
    await conn.query('INSERT INTO admins (username, password_hash, nickname) VALUES (?, ?, ?)', ['admin', hash, '系统管理员'])
    console.log('已创建默认管理员: admin / admin123(请首次登录后立即改密)')
  } else {
    console.log('admins 表已存在,跳过默认管理员')
  }
} finally {
  await conn.end()
}
