import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path';
import copy from 'rollup-plugin-copy'
import topLevelAwait from 'vite-plugin-top-level-await'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    return {
      base: './',
      test: {
        globals: true,
        environment: 'jsdom',
      },
      plugins: [
        dts({ rollupTypes: true }),
        react({
          babel: {
            plugins: ['@babel/plugin-syntax-top-level-await']
          }
        }),
        topLevelAwait({
          promiseExportName: '__tla',
          promiseImportName: i => `__tla_${i}`
        }),
        copy({
          targets: [{ src: 'node_modules/**/*.wasm', dest: 'node_modules/.vite/dist'}],
          copySync: true,
          hook: 'buildStart'
        }),
      ],
      optimizeDeps: {
        esbuildOptions: {
          target: 'esnext'
        }
      },
      server: {
        port: 3000,
      },
      build: {
        sourcemap: true,
        target: 'esnext',
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: '@gribi/vault',
          fileName: (format) => `vault.${format}.js`,
          formats: ['es']
        }
      }
    }
});

