## 公司荣誉模块(使命愿景之后,图片清晰化处理)

### 图片排序(7 张,按重要程度;honor4 与 honor5 并列连续排放)
1. **honor1** 荣誉证书合集(高新技术企业、安全生产标准化、SEC 认证、专利综合展示)
2. **honor2** 上海市"专精特新"中小企业铜牌
3. **honor4** SEC 质量管理体系认证证书(中文版)
4. **honor5** SEC 质量管理体系认证证书(英文版)——与 honor4 并列相邻
5. **honor6** 安全生产标准化三级企业证书
6. **honor7** 实用新型专利证书(多本)
7. **honor8** 专利登记簿副本
- 仅剔除 honor3(与 honor2 同为专精特新,取更清晰的 honor2)

### 清晰化处理
安装 `sharp`(devDependency),脚本统一处理 7 张图:宽度归一 800px、锐化、对比度增强,输出 `src/assets/honors/`

### 页面实现
- `src/data/index.js` 新增 `honors` 数组(name/desc/image,按上述顺序,双语)
- About 页在**使命愿景区块之后**插入「公司荣誉」区块:3 列卡片网格(图片 + 荣誉名称 + 说明),honor4/honor5 相邻,悬停微抬升
- build → 浏览器检查 → P4 更新 activeContext → P5 提交推送汇报哈希