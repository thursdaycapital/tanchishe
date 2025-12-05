# GitHub 上传指南

## ✅ 已完成
- ✅ Git 仓库已初始化
- ✅ 所有文件已添加到 Git
- ✅ 初始提交已完成

## 📤 上传到 GitHub

### 方法 1: 在 GitHub 网站创建仓库（推荐）

1. **创建新仓库**
   - 访问 https://github.com/new
   - 仓库名称：`tanchishe` 或 `snake-game-farcaster`
   - 描述：`复古风格的贪吃蛇游戏 Farcaster MiniApp`
   - 选择 **Public** 或 **Private**
   - **不要** 勾选 "Initialize this repository with a README"
   - 点击 "Create repository"

2. **连接并推送代码**
   在终端运行以下命令（将 `YOUR_USERNAME` 替换为你的 GitHub 用户名）：

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/tanchishe.git
   git branch -M main
   git push -u origin main
   ```

   如果使用 SSH（需要配置 SSH key）：
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/tanchishe.git
   git branch -M main
   git push -u origin main
   ```

### 方法 2: 使用 GitHub CLI

如果你已安装 GitHub CLI：

```bash
gh repo create tanchishe --public --source=. --remote=origin --push
```

### 方法 3: 使用 Vercel 直接导入

1. 访问 https://vercel.com
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 点击 "Configure GitHub App" 连接 GitHub
5. 选择你的仓库并导入

## 🔐 身份验证

如果推送时要求输入用户名和密码：

- **用户名**: 你的 GitHub 用户名
- **密码**: 使用 Personal Access Token（不是 GitHub 密码）
  - 创建 Token: https://github.com/settings/tokens
  - 选择 `repo` 权限
  - 复制 Token 作为密码使用

## ✅ 验证上传

上传成功后，访问你的 GitHub 仓库页面，应该能看到所有文件。

## 🚀 后续步骤

上传到 GitHub 后：

1. **部署到 Vercel**
   - 在 Vercel 导入 GitHub 仓库
   - 自动部署

2. **在 Warpcast 发布**
   - 获取 Vercel 部署 URL
   - 在 Warpcast 创建 MiniApp

详细步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

