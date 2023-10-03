import { fileURLToPath } from 'url';
import { configDefaults, defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
export default defineConfig(({ mode }) => {
  // By default this plugin will only load variables that start with VITE_*
  // To fix this we can use the loadEnv function from Vite
  // We set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  return {
    test: {
      globals: true,
      exclude: [...configDefaults.exclude, '**/playwright/**'],
      alias: {
        '~/': fileURLToPath(new URL('./src/', import.meta.url)),
      },
    },
  };
});
