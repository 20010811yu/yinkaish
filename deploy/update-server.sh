#!/usr/bin/env bash
# 服务器端发版脚本(整站 VPS 部署):拉代码 → 构建前端(根路径)→ 装后端依赖 → pm2 重载 → 健康检查
# 用法(在服务器上):bash /var/www/yinkai/deploy/update-server.sh
# 可选环境变量:APP_DIR(仓库目录,默认 /var/www/yinkai)、SKIP_BUILD=1(前端已在本地构建并上传 dist 时跳过构建)
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/yinkai}"
cd "$APP_DIR"

echo "==> git pull"
git pull --ff-only

if [[ "${SKIP_BUILD:-0}" != "1" ]]; then
  echo "==> build frontend (VITE_DEPLOY=vps → base /)"
  npm ci
  # 内存 ≤1G 的机器若在此 OOM,改为本地构建后 scp dist 上传,并以 SKIP_BUILD=1 运行本脚本
  VITE_DEPLOY=vps npm run build
fi

echo "==> install server deps"
cd server
npm ci --omit=dev

echo "==> pm2 reload"
if pm2 describe yinkai-api >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs
else
  pm2 start ecosystem.config.cjs
fi
pm2 save

echo "==> health check"
sleep 1
curl -fsS http://127.0.0.1:3001/api/health && echo "  api ok"
echo "==> done"
