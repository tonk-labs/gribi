import { defineConfig } from 'vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    return {
      base: './',
      test: {
        globals: true,
      },
      build: {
        lib: {
          entry: path.resolve(__dirname, 'index.ts'),
          name: '@gribi/circuits',
          fileName: (format) => `circuits.${format}.js`
        }
      }
    }
});
