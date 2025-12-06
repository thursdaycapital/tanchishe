# 贪吃蛇 Farcaster MiniApp

一个复古风格的贪吃蛇游戏，作为 Farcaster MiniApp 部署在 Warpcast 上。

## 功能特性

- 🐍 经典贪吃蛇游戏玩法
- 🎮 支持键盘和触摸控制
- 🏆 实时排行榜
- 🎨 复古 CRT 风格界面
- 📱 响应式设计，适配移动端

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **@farcaster/frame-sdk** - Farcaster MiniApp SDK
- **Vercel** - 部署平台

## 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 部署到 Vercel

1. 将代码推送到 GitHub

2. 在 [Vercel](https://vercel.com) 导入项目

3. 部署完成后，获取部署 URL

## 在 Warpcast 上发布 MiniApp

1. 登录 [Warpcast](https://warpcast.com)

2. 访问 MiniApp 管理页面（通常在设置或开发者选项中）

3. 创建新的 MiniApp，填写以下信息：
   - **名称**: 贪吃蛇
   - **描述**: 复古风格的贪吃蛇游戏
   - **URL**: 你的 Vercel 部署 URL
   - **图标**: 上传一个游戏图标（可选）

4. 保存并发布

## 游戏控制

- **方向键** / **滑动**: 控制蛇的移动方向
- **空格键**: 暂停/继续游戏

## 注意事项

- 当前排行榜使用内存存储，服务器重启后会清空。生产环境建议使用数据库（如 Vercel KV、PostgreSQL 等）
- 确保部署的 URL 支持 iframe 嵌入（已配置在 `next.config.js` 和 `vercel.json` 中）

## 许可证

MIT



