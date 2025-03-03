// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Your backend URL
        changeOrigin: true, // To avoid CORS issues
        secure: false, // If SSL is not needed
      },
    },
  },
});