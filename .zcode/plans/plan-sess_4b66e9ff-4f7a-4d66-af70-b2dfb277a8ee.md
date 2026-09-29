# 用密码 111111 完成建库与联调

1. 写入 `server/.env`（DB_PASSWORD=111111，文件已在 .gitignore，不会入库）
2. `cd server && npm run setup` 执行 schema.sql + seed.sql 建库建表灌种子数据，校验各表行数
3. 启动 `npm start`（后台），curl 实测 /api/news、/api/products 等接口返回真实数据
4. 如有报错就地修复；完成后更新记忆库中「建库待执行」状态并提交推送