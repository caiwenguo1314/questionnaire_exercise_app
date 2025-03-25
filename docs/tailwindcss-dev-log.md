
# Tailwind CSS 前端开发常用文档

## 一、概述
- Tailwind CSS 是一个实用优先的 CSS 框架，通过类名直接在 HTML 中应用样式，提供高效、灵活的开发体验。本文档总结了前端开发中高频使用的 Tailwind CSS 类、命令和技巧，适用于快速参考。

## 二、常用命令
### 1. 安装 Tailwind CSS
```bash
# 使用 npm 安装
npm install -D tailwindcss
npx tailwindcss init
```

### 2. 配置文件
- 初始化配置文件 `tailwind.config.js`：
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. 编译 CSS
```bash
# 开发模式，实时监听文件变化
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

# 生产模式，压缩输出
npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
```

### 4. 输入文件示例（`input.css`）
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 三、常用类名与高频用法
### 1. 布局
- **Flexbox**：
  - `flex`：启用 Flex 布局
  - `flex-row` / `flex-col`：行/列方向
  - `justify-between`：两端对齐
  - `items-center`：垂直居中
  - `gap-4`：子元素间距（1rem）
  ```html
  <div class="flex flex-row justify-between items-center gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
  ```

- **Grid**：
  - `grid`：启用 Grid 布局
  - `grid-cols-3`：3 列网格
  - `gap-6`：网格间距（1.5rem）
  ```html
  <div class="grid grid-cols-3 gap-6">
    <div>Col 1</div>
    <div>Col 2</div>
    <div>Col 3</div>
  </div>
  ```

- **定位**：
  - `relative`：相对定位
  - `absolute`：绝对定位
  - `top-0` / `left-0`：定位偏移
  ```html
  <div class="relative">
    <div class="absolute top-0 left-0">Overlay</div>
  </div>
  ```

### 2. 尺寸与间距
- **宽度与高度**：
  - `w-full`：宽度 100%
  - `h-64`：高度 16rem（256px）
  - `max-w-md`：最大宽度 medium（28rem）
- **内边距与外边距**：
  - `p-4`：内边距 1rem
  - `m-2`：外边距 0.5rem
  - `px-6`：水平内边距 1.5rem
  - `mt-8`：上外边距 2rem
  ```html
  <div class="w-full p-4 mt-8">
    Content with padding and margin
  </div>
  ```

### 3. 文字与排版
- **字体大小**：
  - `text-sm`：小号文字（0.875rem）
  - `text-xl`：大号文字（1.25rem）
- **字体粗细**：
  - `font-bold`：粗体
  - `font-light`：细体
- **文字对齐**：
  - `text-center`：居中
  - `text-left`：左对齐
- **行高**：
  - `leading-tight`：紧凑行高
  - `leading-10`：固定行高（2.5rem）
  ```html
  <p class="text-xl font-bold text-center leading-tight">
    Bold Centered Text
  </p>
  ```

### 4. 颜色与背景
- **文字颜色**：
  - `text-gray-700`：灰色 700
  - `text-blue-500`：蓝色 500
- **背景颜色**：
  - `bg-red-200`：红色 200
  - `bg-transparent`：透明背景
- **渐变**：
  - `bg-gradient-to-r from-blue-500 to-purple-500`：从左到右渐变
  ```html
  <div class="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
    Gradient Background
  </div>
  ```

### 5. 边框与圆角
- **边框**：
  - `border`：默认边框
  - `border-2`：边框宽度 2px
  - `border-gray-300`：灰色边框
- **圆角**：
  - `rounded`：默认圆角（0.25rem）
  - `rounded-full`：完全圆形
  - `rounded-lg`：大圆角（0.5rem）
  ```html
  <div class="border-2 border-gray-300 rounded-lg p-4">
    Box with Border and Rounded Corners
  </div>
  ```

### 6. 阴影与效果
- **阴影**：
  - `shadow`：默认阴影
  - `shadow-lg`：大阴影
  - `shadow-inner`：内阴影
- **透明度**：
  - `opacity-50`：50% 透明度
- **过渡动画**：
  - `transition`：默认过渡
  - `duration-300`：过渡时间 300ms
  - `hover:scale-105`：鼠标悬停放大 1.05 倍
  ```html
  <button class="shadow-lg transition duration-300 hover:scale-105">
    Hover Me
  </button>
  ```

## 四、常用效果
### 1. 响应式设计
- 使用前缀（如 `sm:`, `md:`, `lg:`）实现响应式：
  ```html
  <div class="text-center sm:text-left md:flex lg:gap-8">
    Responsive Content
  </div>
  ```
  - `sm:`：小屏幕（640px+）
  - `md:`：中等屏幕（768px+）
  - `lg:`：大屏幕（1024px+）

### 2. 伪类与交互
- **Hover**：
  - `hover:bg-blue-600`：悬停时背景变蓝
- **Focus**：
  - `focus:ring-2 focus:ring-blue-500`：聚焦时显示蓝色环
- **Active**：
  - `active:bg-gray-700`：点击时背景变灰
  ```html
  <button class="bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 active:bg-gray-700">
    Interactive Button
  </button>
  ```

### 3. 自定义组合
- 使用 `@apply` 在组件中组合样式：
  ```css
  @layer components {
    .btn-primary {
      @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600;
    }
  }
  ```
  ```html
  <button class="btn-primary">Primary Button</button>
  ```

## 五、常用技巧
1. **调试样式**：
   - 添加 `outline outline-red-500` 检查元素边界。
2. **动态类名**：
   - Tailwind 不支持动态拼接类名，使用完整类名或数组条件：
     ```javascript
     <div className={isActive ? 'bg-blue-500' : 'bg-gray-500'}>
     ```
3. **扩展主题**：
   - 在 `tailwind.config.js` 中自定义颜色、间距等：
     ```javascript
     theme: {
       extend: {
         colors: {
           'custom-blue': '#1E40AF',
         },
         spacing: {
           '128': '32rem',
         },
       },
     }
     ```
4. **减少冗余**：
   - 使用组件化或 `@apply` 复用样式，避免类名过多。
5. **优化生产环境**：
   - 配置 `content` 路径，确保只打包用到的类，减少 CSS 文件体积。

## 六、快速参考表
| 功能         | 类名示例                  | 说明                |
|--------------|---------------------------|---------------------|
| Flex 布局    | `flex items-center`       | 水平垂直居中        |
| Grid 布局    | `grid grid-cols-2 gap-4`  | 两列网格，间距 1rem |
| 文字样式     | `text-lg font-bold`       | 大号粗体文字        |
| 背景渐变     | `bg-gradient-to-r`        | 左右渐变            |
| 响应式       | `md:flex lg:text-xl`      | 中屏 Flex，大屏大字 |
| 交互效果     | `hover:bg-blue-500`       | 悬停变蓝            |

---

以上文档涵盖了 Tailwind CSS 在前端开发中的核心用法，建议结合官方文档（https://tailwindcss.com/docs）深入学习。希望这份参考能提升你的开发效率！