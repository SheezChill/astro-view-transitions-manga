import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import UnoCSS from '@unocss/astro'
import svelte from '@astrojs/svelte'

import deno from '@astrojs/deno'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: deno(),
  integrations: [svelte(), UnoCSS()],
  server: {
    headers: {
      'Cache-Control': 'public, max-age=315360000, immutable'
    }
  }
})
