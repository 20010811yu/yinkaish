# 整站 VPS 部署手册(Nginx + pm2 + MySQL)

> 适用:把官网前端、后端 API、MySQL 全部部署到一台海外 Linux VPS(Ubuntu 22.04 / 24.04)。
> 与现有 Netlify / GitHub Pages 静态托管**并存互不影响**:三者共用同一代码库,靠构建参数区分(见 §7)。

## 1. 架构

```text
浏览器 ──HTTPS──> Nginx(80/443)
                   ├── /            → /var/www/yinkai/dist 静态文件(Vue SPA,深链回退 index.html)
                   ├── /api/*       → 127.0.0.1:3001 Express(pm2 守护,进程名 yinkai-api)
                   └── /uploads/*   → 127.0.0.1:3001(管理端上传的图片)
                                          └── MySQL 8(仅监听 127.0.0.1,库 yinkai_web)
```

前端所有接口请求都是相对路径(`/api/...`),同源反代后无需改任何前端地址,也没有 CORS 问题。

本目录文件:

| 文件 | 用途 |
|------|------|
| `deploy/nginx.conf` | Nginx 站点模板(占位 `__DOMAIN__`) |
| `deploy/update-server.sh` | 服务器端发版脚本:拉代码 → 构建 → 装依赖 → pm2 重载 → 健康检查 |
| `server/ecosystem.config.cjs` | pm2 进程定义(cwd 固定在 server/,注入 NODE_ENV=production) |
| `server/.env.example` | 后端环境变量模板(数据库 / JWT / CORS / SMTP) |

## 2. 服务器一次性初始化

### 2.1 系统与防火墙

```bash
adduser deploy && usermod -aG sudo deploy          # 不用 root 跑服务
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw enable
```

只开 22/80/443:3001(API)与 3306(MySQL)不对公网暴露,外部只能经 Nginx 进入。

### 2.2 安装运行环境

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs
sudo npm i -g pm2
sudo apt install -y mysql-server nginx certbot python3-certbot-nginx git
sudo mysql_secure_installation
```

### 2.3 MySQL 建库与数据迁移

本机库里有管理端编辑过的真实内容,**不要在服务器重新跑种子**(`npm run setup`),整库导出导入。全程显式 utf8mb4,避免中文乱码(ERR-014 教训):

```bash
# 本机(Git Bash)
mysqldump -u root -p --default-character-set=utf8mb4 --single-transaction yinkai_web > yinkai_web.sql
scp yinkai_web.sql deploy@服务器IP:~/
scp -r server/uploads deploy@服务器IP:~/uploads-backup      # 上传图不在 git 里,必须手动搬

# 服务器
sudo mysql -e "CREATE DATABASE yinkai_web CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'yinkai'@'127.0.0.1' IDENTIFIED BY '强密码';
GRANT ALL ON yinkai_web.* TO 'yinkai'@'127.0.0.1'; FLUSH PRIVILEGES;"
mysql -u yinkai -p --default-character-set=utf8mb4 yinkai_web < ~/yinkai_web.sql
```

### 2.4 拉代码与后端配置

```bash
sudo mkdir -p /var/www && sudo chown deploy:deploy /var/www
git clone https://github.com/20010811yu/yinkaish.git /var/www/yinkai
cd /var/www/yinkai/server
mkdir -p uploads && cp -r ~/uploads-backup/* uploads/ 2>/dev/null || true
cp .env.example .env && nano .env
```

`.env` 必填项(模板里都有注释):

| 变量 | 说明 |
|------|------|
| `DB_USER` / `DB_PASSWORD` / `DB_NAME` | 上一步创建的账号与库 |
| `JWT_SECRET` | `openssl rand -hex 32` 生成;生产缺失会拒绝启动 |
| `FRONTEND_ORIGIN` | `https://www.example.com,https://example.com`(管理端登录的 CORS 白名单) |
| `SMTP_*` / `MAIL_FROM` / `MAIL_TO` | 联系表单、职位申请的邮件通知;不配则两个接口返回 503、前端提示提交失败 |

SMTP 参考:腾讯企业邮 `smtp.exmail.qq.com:465`;163 邮箱 `smtp.163.com:465`(密码填**授权码**);Gmail `smtp.gmail.com:465`(应用专用密码)。

### 2.5 首次构建与启动

```bash
bash /var/www/yinkai/deploy/update-server.sh
```

脚本会 `npm ci` → `VITE_DEPLOY=vps npm run build` → 后端 `npm ci --omit=dev` → `pm2 start ecosystem.config.cjs` → 请求 `/api/health`。看到 `api ok` 即后端正常。随后让 pm2 开机自启:

```bash
pm2 startup          # 按提示执行它输出的那条 sudo 命令
pm2 save
```

> 内存 ≤1G 的机器构建可能 OOM。改为本机 `VITE_DEPLOY=vps npm run build` 后 `scp -r dist deploy@服务器IP:/var/www/yinkai/`,再以 `SKIP_BUILD=1 bash deploy/update-server.sh` 运行脚本。
> 根路径用枚举值 `VITE_DEPLOY=vps` 而不是 `VITE_BASE=/`:Git Bash 会把以 `/` 开头的变量值转成 Windows 路径(ERR-021)。

### 2.6 Nginx 与 HTTPS

```bash
sudo sed 's/__DOMAIN__/example.com/g' /var/www/yinkai/deploy/nginx.conf | sudo tee /etc/nginx/sites-available/yinkai.conf
sudo ln -s /etc/nginx/sites-available/yinkai.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# 域名 A 记录已指向服务器后:
sudo certbot --nginx -d example.com -d www.example.com
```

certbot 会自动改写站点配置(加 443、证书路径、80→443 跳转)并注册续期定时器(`systemctl status certbot.timer`)。

## 3. 上线验收清单

- [ ] 首页、`/products`、`/news/1` 直接刷新不白屏(base 为根路径、SPA 回退生效)
- [ ] 切英文后新闻 / 产品参数显示英文(说明 `/api` 命中真实数据,ERR-019 的合并逻辑在线上生效)
- [ ] `curl -H "Accept-Encoding: gzip" -I https://example.com/ | grep -i content-encoding` 返回 gzip
- [ ] `/admin` 登录成功,**立即把默认 admin/admin123 改掉**
- [ ] 管理端上传一张图并在前台显示(`/uploads` 反代与目录权限)
- [ ] 联系表单提交成功并收到邮件;职位申请附带简历附件收到邮件(含中文文件名正常)
- [ ] 连续错 6 次密码得到 429,且不影响其他 IP(trust proxy 生效,限速按真实访客计)

## 4. 日常发版

```bash
# 代码推到 GitHub main 之后,在服务器上:
bash /var/www/yinkai/deploy/update-server.sh
```

前端产物覆盖后立即生效(Nginx 不需 reload);后端由 pm2 reload。只有改了 Nginx 配置本身才需要 `sudo nginx -t && sudo systemctl reload nginx`。

日志:`pm2 logs yinkai-api`(Node)、`/var/log/nginx/access.log` 与 `error.log`(Nginx)。

## 5. 备份

数据库和上传图片都只在这台服务器上,仓库里没有。建议 cron 每日:

```bash
# /etc/cron.daily/yinkai-backup(chmod +x)
#!/usr/bin/env bash
set -e
D=/var/backups/yinkai && mkdir -p "$D"
mysqldump -u yinkai -p'强密码' --default-character-set=utf8mb4 --single-transaction yinkai_web | gzip > "$D/db-$(date +%F).sql.gz"
tar czf "$D/uploads-$(date +%F).tgz" -C /var/www/yinkai/server uploads
find "$D" -mtime +30 -delete
```

再把 `/var/backups/yinkai` 同步到对象存储或另一台机器。

## 6. 排障对照表

| 症状 | 原因与修法 |
|------|-----------|
| 首页白屏,资源 404 且 URL 带 `/yinkaish/`(或 `/Git/`) | 构建时没传 `VITE_DEPLOY=vps`(或在 Git Bash 用了 `VITE_BASE=/` 被转成 Windows 路径),重新运行 `update-server.sh` |
| 刷新 `/news/1` 报 404 | Nginx `location /` 缺 `try_files ... /index.html` |
| `/api` 全部 502 | Node 未起或端口不对:`pm2 status`、`pm2 logs yinkai-api`、`.env` 的 `PORT` |
| `/api` 全部 404 | `proxy_pass` 误写成带 `/` 结尾(剥掉了 `/api` 前缀) |
| 启动即退出,日志 `JWT_SECRET must be set` | 生产模式缺 `JWT_SECRET`,补到 `.env` |
| 启动报 `ERR_ERL_UNEXPECTED_X_FORWARDED_FOR` | `server/src/index.js` 的 `app.set('trust proxy', 1)` 被改掉 |
| 上传图片 / 简历报 413 | Nginx `client_max_body_size` 没放宽(模板已设 12m) |
| 表单提交失败,接口返回 503 | `.env` 未配置 `SMTP_HOST` / `MAIL_TO` |
| 表单提交失败,接口返回 502 | SMTP 凭据或端口错误,看 `pm2 logs` 中 `[mail] send failed` |
| 管理端登录报 `origin not allowed` | `FRONTEND_ORIGIN` 没加上线域名(含 https 与 www/裸域两种) |
| 数据库中文变问号 | 导出或导入时漏了 `--default-character-set=utf8mb4` |
| `.sh` 脚本报 `\r: command not found` | 文件被转成 CRLF;仓库 `.gitattributes` 已强制 LF,重新 `git checkout -- deploy/` |

## 7. 三平台共存说明

| 平台 | base | 表单 | 动态内容 |
|------|------|------|---------|
| VPS(本手册) | `VITE_DEPLOY=vps` → `/` | 自建后端 `/api/contact`、`/api/apply` → SMTP | 真实 MySQL |
| Netlify | 环境变量 `NETLIFY` → `/` | Netlify Forms(前端探测不到后端 JSON 应答即自动回退) | 静态兜底种子 |
| GitHub Pages | 默认 `/yinkaish/` | 不可用(无表单后端,原有限制) | 静态兜底种子 |

前端表单提交链路在 `src/api/forms.js`:先 POST 自建后端,拿不到 JSON 应答再回退 Netlify 影子表单,所以同一份构建逻辑在三个平台行为正确。
