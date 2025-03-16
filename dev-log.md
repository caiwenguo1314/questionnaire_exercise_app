# 问卷调查应用开发日志

## 2025-03-16

### 18:00 项目初始化

- 使用 Create React App 创建项目
- 项目名称：questionnaire_exercise_app
- 技术栈选型：
  - 前端框架：React + TypeScript
  - 样式方案：Tailwind CSS
  - 状态管理：React Context
  - 后端规划：Node.js + Prisma + SQLite

### 18:15 TypeScript 配置

- 安装依赖：
  ```bash
  npm install typescript @types/react @types/react-dom @types/node
  ```
- 配置 tsconfig.json
  - 添加 React 支持
  - 配置模块解析
  - 设置类型检查
  - 配置文件包含规则

### 18:26 样式方案配置

- 安装 Tailwind CSS 相关依赖：
  ```bash
  npm install tailwindcss postcss autoprefixer
  ```
- 配置 Tailwind CSS

```bash
npx tailwindcss init
```

# tailwind.config.ts

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    },
  plugins: [],
  }
```

# index.css

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
### 18:45 路由系统配置
- 安装路由依赖：
  ```bash
  npm install react-router-dom
  ```
 
  - 创建基础页面组件文件：
  - PolicySelect.tsx: 保单选择页面
  - QuestionnaireForm.tsx: 问卷表单页面
  - BankInfo.tsx: 银行信息页面
  - Confirmation.tsx: 确认页面
  - ErrorPage.tsx: 错误页面
- 配置路由系统
  - 在 App.tsx 中设置路由结构
  - 实现基本的页面导航功能
### 待办事项
- 配置 Tailwind CSS
- 搭建项目目录结构
- 实现路由系统
- 开发保单选择页面
- 实现页面组件的具体功能
- 添加状态管理
- 实现表单验证