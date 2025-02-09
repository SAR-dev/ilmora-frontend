import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  envDir: "./env",
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@layouts": "/src/layouts",
      "@assets": "/src/assets",
    },
  },
})
