import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vitest'],
      dts: true,
      dirs: ['./composables']
    }),
    Components({
      dirs: ['./components']
    })
  ],
  test: {
    environment: 'happy-dom',
    server: {
      deps: {
        inline: ['vuetify']
      }
    },
    setupFiles: ['./tests/specHelpers.ts']
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '.')
    }
  }
})
