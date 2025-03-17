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
 ```bash
mkdir src\components
mkdir src\pages
mkdir src\hooks
mkdir src\context
mkdir src\utils
mkdir src\types
mkdir src\styles
mkdir src\assets
```

目录结构说明：

- components : 存放可复用的组件
- pages : 存放页面级组件
- hooks : 存放自定义 hooks
- context : 存放 Context 相关文件
- utils : 存放工具函数
- types : 存放 TypeScript 类型定义
- styles : 存放样式文件
- assets : 存放静态资源（图片等）
在 components 目录下，我们还可以进一步细分：

```bash
mkdir src\components\layout
mkdir src\components\ui
mkdir src\components\form
```

- layout : 布局相关组件
- ui : 通用 UI 组件
- form : 表单相关组件
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


- 开发保单选择页面
- 实现页面组件的具体功能
- 添加状态管理
- 实现表单验证