import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6001,
    proxy: {
      "/auth-api": { target: "http://localhost:3002" },
      "/finco": { target: "http://localhost:3002" }
    },
  },
});
