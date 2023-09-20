import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  // Would prefer to use svgr default export
  plugins: [svgr(), react(), tsconfigPaths()],
  server: {
    // Optional use to work with localhost:3000
    port: 3000,
  },
});
