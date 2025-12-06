# 部署清单 - 贪吃蛇 Farcaster MiniApp

## ✅ 开发环境准备

- [x] Node.js 18+ 已安装
- [x] npm 或 yarn 已安装
- [x] Git 已安装

## 📦 本地开发步骤

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问应用
打开浏览器访问: http://localhost:3000

### 4. 测试功能
- [ ] 游戏可以正常启动
- [ ] 方向键控制正常
- [ ] 触摸滑动控制正常（移动端）
- [ ] 游戏结束弹窗显示
- [ ] 排行榜可以提交和显示
- [ ] 复古样式正常显示

## 🚀 部署到 Vercel

### 1. 准备代码仓库
```bash
git init
git add .
git commit -m "Initial commit: Snake game Farcaster miniapp"
```

### 2. 推送到 GitHub
- 在 GitHub 创建新仓库
- 推送代码：
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### 3. 在 Vercel 部署
1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. 配置项目：
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. 点击 "Deploy"
7. 等待部署完成，获取部署 URL（例如：`https://your-app.vercel.app`）

### 4. 验证部署
- [ ] 访问部署 URL，确认应用正常加载
- [ ] 测试游戏功能
- [ ] 检查响应式设计（移动端和桌面端）

## 🎯 在 Warpcast 上发布 MiniApp

### 1. 准备信息
- **应用名称**: 贪吃蛇 / Snake Game
- **应用描述**: 复古风格的贪吃蛇游戏，包含实时排行榜
- **应用 URL**: 你的 Vercel 部署 URL
- **应用图标**: 准备一个 512x512 的 PNG 图标（可选）

### 2. 在 Warpcast 创建 MiniApp
根据 [Farcaster MiniApps 文档](https://miniapps.farcaster.xyz/)：

1. 登录 Warpcast
2. 访问 MiniApp 管理页面（通常在设置或开发者工具中）
3. 点击 "Create MiniApp" 或 "Add MiniApp"
4. 填写表单：
   - **Name**: 贪吃蛇
   - **Description**: 复古风格的贪吃蛇游戏，包含实时排行榜功能
   - **URL**: `https://your-app.vercel.app`
   - **Icon**: 上传图标（可选）
   - **Category**: Games
5. 保存并发布

### 3. 测试 MiniApp
- [ ] 在 Warpcast 中打开你的 MiniApp
- [ ] 确认游戏可以正常加载
- [ ] 测试游戏控制
- [ ] 测试排行榜功能
- [ ] 确认 Farcaster 用户信息可以获取（如果支持）

## 🔧 故障排除

### 问题：应用无法在 iframe 中加载
**解决方案**: 
- 检查 `next.config.js` 中的 headers 配置
- 检查 `vercel.json` 中的 headers 配置
- 确保 `X-Frame-Options` 设置为 `ALLOWALL`

### 问题：排行榜数据丢失
**解决方案**: 
- 当前使用内存存储，服务器重启会清空数据
- 生产环境建议使用 Vercel KV 或 PostgreSQL
- 参考 README.md 中的数据库集成说明

### 问题：Farcaster 用户信息无法获取
**解决方案**: 
- 检查是否在 Farcaster Frame 环境中运行
- 查看浏览器控制台的错误信息
- 确保应用 URL 已正确配置在 Warpcast 中

## 📝 后续优化建议

1. **数据库集成**
   - 使用 Vercel KV 或 PostgreSQL 存储排行榜
   - 实现数据持久化

2. **性能优化**
   - 添加游戏音效（可选）
   - 优化 Canvas 渲染性能
   - 添加加载动画

3. **功能增强**
   - 添加难度等级
   - 添加游戏历史记录
   - 添加社交分享功能

4. **用户体验**
   - 添加游戏教程
   - 优化移动端触摸控制
   - 添加震动反馈（移动端）

## 📚 相关链接

- [Farcaster MiniApps 文档](https://miniapps.farcaster.xyz/)
- [Next.js 文档](https://nextjs.org/docs)
- [Vercel 部署文档](https://vercel.com/docs)
- [Warpcast 文档](https://docs.warpcast.com/)



