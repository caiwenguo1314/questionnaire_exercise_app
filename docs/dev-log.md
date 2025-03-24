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

### 19:00 项目开发规划

- 确定开发顺序：

  1. 类型定义（`src/types/form.ts`）

     - 定义表单数据类型
     - 定义状态类型
     - 定义验证规则类型

  2. 路由配置（`src/router.tsx`）

     - 配置路由结构
     - 设置路由守卫
     - 处理 404 页面

  3. 状态管理（`src/context/FormContext.tsx`）

     - 创建 Context
     - 实现状态更新方法
     - 添加类型支持

  4. 页面组件开发顺序：
     - ErrorPage（404 页面）
     - PolicySelect（保单选择页面）
     - QuestionnaireForm（问卷表单页面）
     - BankInfo（银行信息页面）
     - Confirmation（确认页面）

- 创建必要文件：

```bash
type nul > src\types\form.ts
type nul > src\router.tsx
type nul > src\context\FormContext.tsx
type nul > src\pages\ErrorPage.tsx
type nul > src\pages\PolicySelect.tsx
type nul > src\pages\QuestionnaireForm.tsx
type nul > src\pages\BankInfo.tsx
type nul > src\pages\Confirmation.tsx
```

### 19:10 类型定义实现

- 在 `src/types/form.ts` 中定义核心类型：
  - `PolicyData`: 保单选择页面数据类型
  - `QuestionnaireData`: 问卷调查页面数据类型
  - `BankData`: 银行信息页面数据类型
  - `FormState`: 全局状态类型（包含 currentStep 和 isComplete）
  - `FormAction`: 状态更新动作类型

### 19:15 路由系统实现

- 创建路由配置：

  ```bash
  type nul > src\router\router.tsx
  ```

- 采用了 React Router v6
  使用 createBrowserRouter 创建路由配置,路由配置接受一个 RouteObject 数组作为参数，每个 RouteObject 代表一个路由规则。
  其中，数组是由多个 RouteObject 对象组成。
  每个 RouteObject 对象都包含以下属性：

  ```bash
  const router = createBrowserRouter(routes:[
     {
  path: 路由的路径，用于匹配URL。
  element: 路由对应的组件。
  loader: 可选的异步数据加载器，用于在路由激活时获取数据。
  errorElement: 可选的错误处理组件，用于在路由加载过程中发生错误时显示。
  children: 可选的子路由配置，用于定义嵌套的路由。
  },
  // ...
  ])

  ```

- 在 App.tsx 中使用 provider 路由组件，放在 APP 的返回值中

```bash
<Router.provider router={router}/>
```
