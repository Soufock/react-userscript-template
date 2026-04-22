# ReactDemo - 油猴脚本开发模板

使用 React + TypeScript + Vite 开发 Tampermonkey/ScriptCat 油猴脚本的项目模板。

## 项目说明

本项目旨在提供一个现代化的油猴脚本开发环境，支持：

- React 19 组件开发
- TypeScript 类型安全
- Vite 快速构建与热更新
- CSS 自动注入到 JS 中
- 自动打包为用户脚本格式（`.user.js`）

## 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **styled-components** - CSS-in-JS 样式方案
- **React Compiler** - 自动优化渲染性能

## 项目结构

```
├── src/
│   ├── components/       # React 组件
│   │   └── FloatingButton.tsx   # 悬浮按钮 + 全屏面板组件
│   ├── App.tsx           # 主应用组件
│   ├── main.tsx          # 入口文件
│   └── index.css         # 全局样式
├── script.info           # 油猴脚本元数据（UserScript Header）
├── vite.config.ts        # Vite 配置
├── tampermonkey-reference.d.ts  # Tampermonkey API 类型声明
└── eslint.config.js      # ESLint 配置
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建脚本

```bash
pnpm build
```

构建后会在 `dist/` 目录生成 `script.user.js` 文件，已自动合并脚本元数据。

## 使用说明

### 修改脚本元数据

编辑 `script.info` 文件，修改脚本名称、命名空间、匹配网址等：

```javascript
// ==UserScript==
// @name         你的脚本名称
// @namespace    https://your-namespace.com/
// @version      0.1.0
// @description  脚本描述
// @author       作者
// @match        https://example.com/*    // 匹配的网址
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// @noframes
// ==/UserScript==
```

### 添加 Tampermonkey API 权限

如果在代码中使用了其他 GM API（如 `GM_notification`、`GM_xmlhttpRequest` 等），需要在 `script.info` 中添加对应的 `@grant` 声明。

### 开发组件

在 `src/components/` 目录下创建新的 React 组件，然后在 `App.tsx` 中引入使用。

### 安装到浏览器

1. 安装 Tampermonkey 或 ScriptCat 浏览器扩展
2. 将 `dist/script.user.js` 拖入扩展管理页面安装
3. 访问匹配的网址即可看到脚本效果

## 内置组件

### FloatingButtonWithPanel

右下角悬浮按钮，点击展开全屏面板。

```tsx
import { FloatingButtonWithPanel } from "./components/FloatingButton";

function App() {
  return <FloatingButtonWithPanel />;
}
```

## 注意事项

- 项目配置为 `appType: "custom"`，不生成 HTML 文件
- CSS 会自动注入到 JS 中，无需额外处理
- 构建输出格式为 IIFE，可直接作为油猴脚本安装
