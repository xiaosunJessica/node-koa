import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import commonjsExternals from 'vite-plugin-commonjs-externals';
import requireTransform from 'vite-plugin-require-transform';
// https://vitejs.dev/config/
export default defineConfig({
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
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
