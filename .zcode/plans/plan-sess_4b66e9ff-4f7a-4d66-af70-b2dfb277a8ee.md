# 登录页滑块验证:移到登录按钮上方 + 缺口/拼块位置随机

## 1. AdminLogin.vue — 布局调整
把 `<SlideVerify>` 从登录按钮下方移到按钮上方（用户名/密码之后、按钮之前），删除多余的 `.login__slide` 顶部间距样式（改为按钮上移后的间距）。

## 2. SlideVerify.vue — 缺口垂直位置随机
现状：缺口水平位置随机（targetX），垂直位置固定 y=34。
改动：
- 新增 `notchY = ref(0)`，draw() 时随机：`12 + Math.floor(Math.random() * (CH - PIECE - 24))`（上下各留 12px 安全边距）
- 缺口绘制（roundRect）与拼块绘制（clip 区域、取图偏移）全部使用 `notchY.value`，白边描边同步跟随
- 拼块垂直位置随缺口联动（拖动仍只水平移动）
- **吸取 ERR-009 教训**：改完后 grep `notchY` 全量检查每个使用点都带 `.value`（模板自动解包除外）

## 3. 验证
- `npm run build` 通过
- 浏览器刷新登录页：确认拼图在登录按钮上方；连续 reset 几次确认缺口垂直位置每次随机变化
- 像素采样确认缺口/拼块绘出、拖动判定通过
- git 提交推送