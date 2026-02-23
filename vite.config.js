import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/web_tech_lab3/',
  plugins: [react()],
})
