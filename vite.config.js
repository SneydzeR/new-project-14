import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => ({
  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },
  root: 'src',
  resolve: {
    alias: {
      'accordion-js': 'node_modules/accordion-js/dist/accordion.min.js'
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: glob.sync('./src/*.html'),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; 
          }
        },
        entryFileNames: 'assets/js/[name].[hash].js' 
      },
    },
    outDir: '../dist', 
  },
  plugins: [
    injectHTML({
      inject: {
        data: {
          title: 'My App',
          injectScript: '<script src="/assets/js/main.js"></script>', 
        },
      },
    }),
    FullReload(['./src/**/*.html'], { always: true }) 
  ],
}));
