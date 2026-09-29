# 为数据库表与列补充中文 COMMENT

1. 重写 `server/sql/schema.sql`：每张表加表级 `COMMENT`、每列加列级 `COMMENT`，**全部纯中文**，例如：
   - 表：`COMMENT='新闻表-官网新闻动态'`
   - 列：`title_zh ... COMMENT '标题(中文)'`、`news_date DATE COMMENT '发布日期'`、`is_published TINYINT(1) COMMENT '是否发布(1是 0否)'`、`sort INT COMMENT '排序值(越小越靠前)'`、`image VARCHAR(255) COMMENT '图片文件名(前端映射实际资源)'`、`gallery JSON COMMENT '多图画廊文件名数组'`
2. 重建生效：用 server/.env 连接 DROP 旧表后执行新 schema 并重灌 seed.sql（当前库内仅种子数据，重建安全），核对行数 news 12 / jobs 6 / products 13 / params 149 / honors 7 / partners 20
3. `SHOW FULL COLUMNS` 抽查确认中文 COMMENT 生效
4. 提交推送（记忆库仅 techContext 提一句，无其他变更）