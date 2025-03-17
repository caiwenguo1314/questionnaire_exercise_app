# VS Code 快捷键与操作指南

## 多光标编辑
- `Alt + 鼠标点击`: 添加多个光标
- `Ctrl + Alt + ↑/↓`: 向上/向下添加光标
- `Alt + Shift + 鼠标拖动`: 列选择模式
- `Ctrl + Shift + L`: 选择所有相同的文本
- `Ctrl + D`: 逐个选择相同文本

## 文本操作
- `Ctrl + F`: 查找
- `Ctrl + H`: 替换
- `Ctrl + /`: 行注释
- `Shift + Alt + A`: 块注释
- `Ctrl + [`: 减少缩进
- `Ctrl + ]`: 增加缩进

## 代码格式化
- `Shift + Alt + F`: 格式化整个文档
- `Ctrl + K Ctrl + F`: 格式化选中的代码

## 文件操作
- `Ctrl + N`: 新建文件
- `Ctrl + S`: 保存
- `Ctrl + W`: 关闭当前文件
- `Ctrl + Tab`: 切换文件

## 批量编辑技巧
1. 使用正则表达式替换：
   - 打开替换面板 (`Ctrl + H`)
   - 点击 `.*` 启用正则表达式
   - 使用 `^` 匹配行首，`$` 匹配行尾

2. 列编辑模式：
   - `Alt + Shift + 鼠标拖动`
   - 选中后直接输入或删除

3. 多光标批量编辑：
   - 选中文本
   - `Ctrl + Shift + L`
   - 同时编辑所有选中位置

## 常用命令面板操作
- `Ctrl + Shift + P`: 打开命令面板
  - 输入 "Transform to" 查看文本转换选项
  - 输入 "File: New File" 新建文件
  - 输入 "Format Document" 格式化文档

## 文件和文件夹操作命令
### Windows CMD 命令
1. 创建文件夹：
```bash
# 创建单个文件夹
mkdir src

# 创建多个文件夹
mkdir folder1 folder2 folder3

# 创建嵌套文件夹
mkdir src\components\layout src\components\ui

2. 创建文件：
```bash
# 创建单个文件
type nul > index.tsx

# 创建多个文件（CMD）
type nul > file1.tsx & type nul > file2.tsx & type nul > file3.tsx
 ```


### Windows PowerShell 命令
```bash
# 创建文件夹
New-Item -ItemType Directory -Path src

# 创建多个文件夹
New-Item -ItemType Directory -Path folder1, folder2, folder3

# 创建嵌套文件夹
New-Item -ItemType Directory -Path src\components\layout, src\components\ui -Force

# 创建文件
New-Item -ItemType File -Path index.tsx

# 创建多个文件
New-Item -ItemType File -Path file1.tsx; New-Item -ItemType File -Path file2.tsx
 ```

### VS Code 快捷操作
- 在资源管理器中右键 -> 新建文件
- 在资源管理器中右键 -> 新建文件夹
- Ctrl + N 新建文件
- 在文件资源管理器中直接输入 folder/file.tsx 会自动创建文件夹和文件