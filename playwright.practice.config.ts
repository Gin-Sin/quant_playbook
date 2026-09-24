import { defineConfig } from '@playwright/test'
import config from './playwright.config.js'

export default defineConfig({
  ...config,
  testMatch: 'practice-page.spec.ts',
  workers: 1,
  use: { ...config.use, baseURL: 'http://127.0.0.1:4176/quant_playbook/' },
  webServer: { command: 'node tests/serve-site.mjs', url: 'http://127.0.0.1:4176/quant_playbook/', timeout: 10_000 },
})
