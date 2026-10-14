// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pti-co.tech',
  output: 'static',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
