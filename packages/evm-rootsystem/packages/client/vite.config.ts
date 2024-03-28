import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path';

const wasmContentTypePlugin = {
	name: "wasm-content-type-plugin",
	configureServer(server: any) {
		server.middlewares.use((req: any, res: any, next: any) => {
			if (req.url.endsWith(".wasm")) {
				res.setHeader("Content-Type", "application/wasm");
			}
			next();
		});
	},
};

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    return {
      base: './',
      test: {
        globals: true,
        environment: 'jsdom',
      },
      plugins: [dts({ rollupTypes: true })],
      optimizeDeps: {
        esbuildOptions: {
          target: 'esnext'
        }
      },
      build: {
        rollupOptions: {
          external: ['@noir-lang/noir_js', '@noir-lang/backend_barretenberg']
        },
        sourcemap: true,
        target: 'esnext',
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'gribi',
          fileName: (format) => `gribi.${format}.js`
        }
      }
    }
});

