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

- 开发模式使用 `appType: "spa"`，支持 React 热更新
- 构建模式使用 `appType: "custom"`，只输出 `script.user.js`
- CSS 会自动注入到 JS 中，无需额外处理
- 构建输出格式为 IIFE，可直接作为油猴脚本安装

## 不依赖油猴环境

本项目也可以不依赖油猴运行。如果想自定义注入方式（如作为普通网页脚本、嵌入到其他项目等），只需修改以下两个文件：

**`vite.config.ts`** - 修改构建配置：
```ts
// 改为 SPA 模式，输出标准 JS/CSS 文件
appType: "spa",

// 修改输出格式
rollupOptions: {
  output: {
    format: "es",  // 或 umd
    entryFileNames: "bundle.js",
  },
},
```

**`src/main.tsx`** - 修改挂载方式：
```ts
// 可以挂载到任意 DOM 节点
const root = document.getElementById("your-container-id");
if (root) {
  createRoot(root).render(<App />);
}
```

这样就可以将 React 组件以任意方式注入到网页中，不局限于油猴脚本。

## 样式隔离

油猴脚本直接注入样式时，很容易与目标网站的 CSS 产生冲突。本项目采用以下方式解决：

**styled-components 自动隔离**

项目使用 `styled-components` 作为样式方案，每个组件的样式都会生成唯一的类名（如 `sc-xxxxxx`），自动避免与页面原有样式冲突。

```tsx
// 样式只在组件内部生效，不影响页面其他元素
const Btn = styled.button`
  background: #4f46e5;
  color: white;
  /* 不会被网站的 button 样式覆盖 */
`;
```

**Shadow DOM（可选）**

如果需要更强的隔离，可以在 `main.tsx` 中创建 Shadow DOM：

```ts
const shadowHost = document.createElement("div");
shadowHost.id = "my-app-host";
document.body.appendChild(shadowHost);

const shadowRoot = shadowHost.attachShadow({ mode: "open" });
const appRoot = document.createElement("div");
shadowRoot.appendChild(appRoot);

createRoot(appRoot).render(<App />);
```

Shadow DOM 内的样式完全与外部隔离，网站的 CSS 不会影响组件，组件的样式也不会泄漏到页面。

## 友情链接

- [LinuxDo](https://linux.do/)
