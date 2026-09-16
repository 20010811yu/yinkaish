## 清空项目,仅保留 md 文件

在 D:\yinkai_web 中删除所有非 md 文件:
- `node_modules/`、`src/`、`package.json`、`package-lock.json`、`index.html`、`vite.config.js`
- 保留:`README.md`、`AGENTS.md`、`memory-bank/` 下 7 个 md 文件,以及 `.git` 仓库本身(不清除提交历史)

执行后用 `find` 复核,仅剩 md 文件。