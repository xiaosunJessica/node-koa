import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import babel from "@rollup/plugin-babel"
import commonjsExternals from 'vite-plugin-commonjs-externals';
import requireTransform from 'vite-plugin-require-transform';
// https://vitejs.dev/config/
export default defineConfig({
  logLevel: 'warn',
  server: {
    open: true,
    host: '0.0.0.0',
    cors: true, // 允许跨域
    proxy: {
      '/api': {
        target: 'http://localhost:4999',
        changeOrigin: true,
        secure: false,
      },
      '/stream': {
        target: 'http://localhost:4999',
        changeOrigin: true,
        secure: false,
      },
      '/websocket': {
        target: 'http://localhost:4999',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '/lesscode/api': {
        target: 'http://localhost:4999',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/lesscode\/api/, '/api')
      },
    },
  },
  preview: {
    port: 3001
  },
  plugins: [vue(), vueJsx(),

  //   commonjsExternals({
  //   externals: ['bk-magic-vue'],  //这里
  // }), requireTransform({
  //     fileRegex:/.ts$|.tsx$|.vue$/
	// //   fileRegex:/.js$|.jsx$|.vue$/
  //   }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'shared': fileURLToPath(new URL('./src/views/lesscode/shared', import.meta.url))
    }
  }
})
