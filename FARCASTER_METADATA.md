# Farcaster Miniapp Metadata 配置说明

## 已添加的 Meta 标签

为了确保 Warpcast 能够正确识别和嵌入这个 Miniapp，已添加以下 metadata：

### 1. Farcaster Frame 标签
```html
<meta name="fc:frame" content="vNext" />
```

### 2. Open Graph 标签
```html
<meta property="og:title" content="Snake Game" />
<meta property="og:image" content="https://tanchishe-phi.vercel.app/snake.png" />
<meta property="og:type" content="website" />
<meta property="og:description" content="复古风格的贪吃蛇游戏 Farcaster MiniApp" />
<meta property="og:url" content="https://tanchishe-phi.vercel.app" />
```

## 实现方式

### 服务器端 Metadata（app/layout.tsx）
使用 Next.js 的 `generateMetadata` API 来设置服务器端的 metadata：
- Open Graph 标签通过 `openGraph` 字段设置
- 自定义标签通过 `other` 字段设置

### 客户端 Meta 标签（components/FarcasterMeta.tsx）
创建了一个客户端组件来确保所有必需的 meta 标签在客户端也被正确添加，这对于动态内容很重要。

## 验证步骤

部署后，使用 Warpcast 的 Embed Tool 验证：

1. 访问 https://warpcast.com/~/developers/frames
2. 输入你的 URL: `https://tanchishe-phi.vercel.app`
3. 检查以下状态：
   - ✅ HTTP Status: 200 OK
   - ✅ Embed Present: Yes
   - ✅ Embed Valid: Yes

## 注意事项

1. **图片资源**: 确保 `https://tanchishe-phi.vercel.app/snake.png` 图片存在
   - 如果图片不存在，需要创建并上传到 `public/snake.png`
   - 推荐尺寸: 1200x630px (Open Graph 标准尺寸)

2. **iframe 嵌入**: 已在 `next.config.js` 和 `vercel.json` 中配置允许 iframe 嵌入

3. **服务器端渲染**: metadata 通过 `generateMetadata` 函数在服务器端渲染，确保爬虫能够正确读取

## 创建游戏图标

如果需要创建 `snake.png` 图标：

1. 创建一个 1200x630px 的图片
2. 保存为 `public/snake.png`
3. 图片应该包含游戏名称和视觉元素
4. 使用复古绿色风格，与游戏主题一致

## 测试

部署后，可以使用以下工具验证 meta 标签：

1. **Open Graph 调试器**: https://www.opengraph.xyz/url/https://tanchishe-phi.vercel.app
2. **Warpcast Embed Tool**: https://warpcast.com/~/developers/frames
3. **浏览器开发者工具**: 查看页面源代码，确认 meta 标签存在



