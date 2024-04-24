import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import copy from 'rollup-plugin-copy'
import topLevelAwait from 'vite-plugin-top-level-await'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    return {
      base: './',
      test: {
        globals: true,
        environment: 'jsdom',
      },
      plugins: [
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
        dts({ rollupTypes: true })
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
          name: '@gribi/evm-rootsystem',
          fileName: (format) => `evm-rootsystem.${format}.js`,
          formats: ['es']
        }
      }
    }
});

