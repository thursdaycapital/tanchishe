# 快速启动指南

## 🚀 5 分钟快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 打开浏览器
访问 http://localhost:3000

## 🎮 游戏操作

- **方向键** / **滑动**: 控制蛇的移动
- **空格键**: 暂停/继续游戏

## 📦 构建生产版本

```bash
npm run build
npm start
```

## 🌐 部署到 Vercel

### 方法 1: 使用 Vercel CLI
```bash
npm i -g vercel
vercel
```

### 方法 2: 通过 GitHub
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署

详细部署步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## ✅ 检查清单

部署前请确认：
- [ ] 本地开发测试通过
- [ ] 游戏功能正常
- [ ] 排行榜功能正常
- [ ] 移动端响应式正常
- [ ] Vercel 部署成功
- [ ] 在 Warpcast 中测试通过

## 🐛 常见问题

**Q: 游戏无法控制？**
A: 确保页面已获得焦点，点击游戏区域后再使用方向键

**Q: 排行榜不显示？**
A: 检查浏览器控制台，确认 API 路由正常工作

**Q: 部署后无法在 iframe 中加载？**
A: 检查 `next.config.js` 和 `vercel.json` 中的 headers 配置

更多问题请查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 的故障排除部分

