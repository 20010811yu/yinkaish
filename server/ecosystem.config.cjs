// pm2 进程定义。在 server/ 目录执行:pm2 start ecosystem.config.cjs
// cwd 固定为本目录:db.js 通过 dotenv/config 从 process.cwd() 读取 server/.env,换目录启动会读不到凭据
// 文件用 .cjs 后缀:package.json 为 "type":"module",pm2 配置需要 CommonJS
module.exports = {
  apps: [
    {
      name: 'yinkai-api',
      script: 'src/index.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '300M',
      time: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
