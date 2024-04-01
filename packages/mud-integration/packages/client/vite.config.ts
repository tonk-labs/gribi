import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    return {
      base: './',
      test: {
        globals: true,
      },
      plugins: [dts({ rollupTypes: true })],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: '@gribi/mud',
          fileName: (format) => `mud.${format}.js`
        }
      }
    }
});