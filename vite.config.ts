import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),

    {
      name: "post-build-merge",
      apply: "build",
      closeBundle() {
        const scriptPath = path.resolve(process.cwd(), "dist/script.user.js");
        const scriptInfo = path.resolve(process.cwd(), "script.info");
        if (!fs.existsSync(scriptPath)) return;

        // 读取打包好的文件
        const code = fs.readFileSync(scriptPath, "utf8");
        const info = fs.readFileSync(scriptInfo, "utf8");

        // 最终代码
        const finalCode = `${info}\n\n${code}`.trim();

        // 覆盖回去
        fs.writeFileSync(scriptPath, finalCode, "utf8");
        console.log("✅ 已自动合并脚本元数据");
      },
    },
  ],

  // 开发模式使用 spa，构建使用自定义配置
  appType: command === "serve" ? "spa" : "custom",
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 99999999,

    rollupOptions: {
      input: "./src/main.tsx",
      output: {
        format: "iife",
        entryFileNames: "script.user.js",
        chunkFileNames: "script.user.js",
        manualChunks: undefined,
      },
    },
  },
}));
