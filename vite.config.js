import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  // 定义相对路径，@代替
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    // 按需引入 vant 组件
    styleImport({
      libs: [
        {
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
  // css
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve("src/global.less")}";`,
        },
        javascriptEnabled: true
      }
    }
  },
  // 配置跨域
  server: {
    proxy: {
      "/api": {
        target: "http://yuenov.com:15555",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
