import { defineConfig } from 'astro/config';
import { site } from './src/data/site.mjs';

export default defineConfig({
  site: site.origin,
  base: site.base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
