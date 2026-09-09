import { resolve } from 'node:path';
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
  build: {
    rollupOptions: {
      // Vite only builds index.html by default; list every other page here so
      // it gets the same hashed/minified treatment. Add one entry per new
      // top-level .html file (e.g. each new blog post).
      input: {
        main: resolve(__dirname, 'index.html'),
        blogIndex: resolve(__dirname, 'blog/index.html'),
        blogPortfolioPost: resolve(__dirname, 'blog/how-i-built-my-portfolio-with-claude-code.html'),
      },
    },
  },
});
