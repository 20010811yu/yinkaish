## 新增第三张轮播:视觉检测主题

1. **主视觉**:`scripts/gen-hero-vision.cjs` 生成 `src/assets/hero-vision.svg`(深绿科技风,与第一张统一)——相机镜头光圈 + YK-OL-2I 扫描定位框(标注 ≤1.7s)+ 光伏边框剖面输送线(含 OK/NG 判定)+ 粒子与数据走线
2. **轮播文案**(i18n zh/en):主标语「毫厘之间，明察秋毫」、副标语「让每一支边框都值得信赖」(EN: "Every Millimeter Under Watch" / "Every Frame You Can Trust")
3. **组件**:HeroCarousel slides 增加第三张(视觉检测图 + 两行文案),沿用现有科技感样式
4. **验证收尾**:build 通过 → 浏览器截图检查第三张 → P4 更新 activeContext → P5 提交推送汇报哈希