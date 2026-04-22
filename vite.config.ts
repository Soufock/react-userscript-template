import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import fs from "fs";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }), // 👇 唯一正确、无报错、Vite 官方支持的写法
    cssInjectedByJsPlugin(),

    {
      name: "post-build-base64",
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
        console.log("✅ 已自动将 script.js 转为 base64 执行格式");
      },
    },
  ],

  // 核心：不生成 HTML
  appType: "custom",
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
});
