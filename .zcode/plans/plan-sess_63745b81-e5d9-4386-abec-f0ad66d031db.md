## 修复时间线左右交叉

排查结论:重写 About.vue 时遗漏了奇偶行交换位置(order)的样式规则,导致图片全部在左。修复:
1. 补回 `.vt__row--swap` 的 order 规则(media order 3 / spine 2 / body 1,文字右对齐)
2. build → 浏览器复查左右交叉恢复 → P4 小步更新 activeContext → P5 提交推送汇报哈希