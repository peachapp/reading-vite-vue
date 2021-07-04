const path = require('path');
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 按需引入 vant 组件
    styleImport({
      libs: [
        {
          libraryName: 'vant',
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
          hack: `true; @import (reference) "${path.resolve('src/global.less')}";`,
        },
        javascriptEnabled: true
      }
    }
  },
})
