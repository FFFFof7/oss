import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import eslintPlugin from 'vite-plugin-eslint'
import mockServer from './mock/mockServer/'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src'
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) './src/theme/var.less';`
        }
      }
    }
  },
  plugins: [
    vue(),
    // eslintPlugin(),
    Components({
      dts: true,
      resolvers: [AntDesignVueResolver()]
    }),
    mockServer({
      baseUrl: '/api',
      mockPath: path.resolve(process.cwd(), 'mock')
    })
  ]
})
