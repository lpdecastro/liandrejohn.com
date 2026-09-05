import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Lets `main.scss` resolve `@import 'bootstrap'` etc. from node_modules,
        // same as the old `sass --load-path=node_modules` CLI flag.
        loadPaths: ['node_modules'],
      },
    },
  },
});
