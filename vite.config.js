import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  const base = isBuild ? '/clothing-brand/' : '/'

  return {
    base,
    plugins: [
      react(),
      isBuild && {
        name: 'gh-pages-asset-rewrite',
        transform(code, id) {
          if (id.includes('/src/') && code.includes('/products/')) {
            return {
              code: code.replace(/(['"`])\/products\//g, '$1/clothing-brand/products/'),
              map: null,
            }
          }
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})

