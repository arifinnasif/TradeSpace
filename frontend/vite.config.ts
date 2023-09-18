import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     external: ["react", "react-router", "react-router-dom", "react-redux"],
  //     output: {
  //       globals: {
  //         react: "React",
  //       },
  //     },
  //   },
  // },
  server: {
    host: '127.0.0.1',
    port: 5173
  }
})
