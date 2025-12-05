# 故障排除指南 - 404 错误

## 问题：HTTP Status 404

如果 Warpcast Embed Tool 显示 404 错误，请按以下步骤排查：

### 1. 检查 Vercel 部署状态

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 找到你的项目 `tanchishe`
3. 检查最新的部署状态：
   - ✅ 如果显示 "Ready"，说明部署成功
   - ❌ 如果显示 "Error" 或 "Failed"，点击查看构建日志

### 2. 检查部署 URL

确认你使用的 URL 是否正确：
- 正确的格式：`https://tanchishe-phi.vercel.app` 或 `https://your-project.vercel.app`
- 不要使用带路径的 URL（如 `/page`）
- 确保 URL 是根域名，不是预览部署 URL

### 3. 验证本地构建

在本地测试构建是否成功：

```bash
npm install
npm run build
npm start
```

然后访问 `http://localhost:3000` 确认应用正常。

### 4. 检查 Vercel 构建日志

如果部署失败，查看构建日志中的错误信息：

1. 在 Vercel Dashboard 中点击失败的部署
2. 查看 "Build Logs" 标签
3. 常见错误：
   - **依赖安装失败**: 检查 `package.json` 中的依赖版本
   - **TypeScript 错误**: 运行 `npm run lint` 检查代码错误
   - **构建超时**: 增加构建时间限制或优化构建过程

### 5. 检查路由配置

确保 `app/page.tsx` 文件存在且正确：

```bash
# 检查文件是否存在
ls -la app/page.tsx

# 检查文件内容
cat app/page.tsx | head -20
```

### 6. 重新部署

如果以上都正常，尝试重新部署：

1. 在 Vercel Dashboard 中点击 "Redeploy"
2. 或者推送新的 commit 触发自动部署：
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

### 7. 检查 Vercel 项目设置

在 Vercel Dashboard 中检查项目设置：

1. 进入项目设置 (Settings)
2. 检查 **Framework Preset**: 应该是 "Next.js"
3. 检查 **Root Directory**: 应该是 `./` 或留空
4. 检查 **Build Command**: 应该是 `npm run build` 或留空（自动检测）
5. 检查 **Output Directory**: 应该是 `.next` 或留空（自动检测）

### 8. 测试部署 URL

直接在浏览器中访问部署 URL：

```
https://tanchishe-phi.vercel.app
```

- ✅ 如果能看到游戏界面，说明部署成功
- ❌ 如果显示 404，说明路由配置有问题

### 9. 检查环境变量

如果使用了环境变量，确保在 Vercel 中正确配置：

1. 进入项目 Settings > Environment Variables
2. 添加所需的环境变量
3. 重新部署

### 10. 联系支持

如果以上步骤都无法解决问题：

1. 查看 Vercel 的 [故障排除文档](https://vercel.com/docs/concepts/deployments/troubleshooting)
2. 检查 [Next.js 部署文档](https://nextjs.org/docs/deployment)
3. 在 Vercel 社区论坛寻求帮助

## 常见错误和解决方案

### 错误：Module not found
**解决方案**: 
```bash
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "Fix dependencies"
git push
```

### 错误：Build failed - TypeScript errors
**解决方案**:
```bash
npm run lint
# 修复所有错误后
git add .
git commit -m "Fix TypeScript errors"
git push
```

### 错误：Deployment timeout
**解决方案**:
- 优化构建过程
- 检查是否有大型文件需要上传
- 考虑使用 Vercel 的构建缓存

## 验证清单

部署成功后，确认以下项目：

- [ ] 在浏览器中直接访问 URL 可以正常显示
- [ ] 游戏可以正常加载和运行
- [ ] API 路由 (`/api/leaderboard`) 正常工作
- [ ] 页面源代码中包含正确的 meta 标签
- [ ] Warpcast Embed Tool 显示 HTTP Status 200

## 快速修复命令

如果遇到问题，可以尝试以下命令：

```bash
# 清理并重新安装依赖
rm -rf node_modules .next package-lock.json
npm install

# 本地测试构建
npm run build
npm start

# 如果构建成功，提交并推送
git add .
git commit -m "Fix deployment issues"
git push
```

