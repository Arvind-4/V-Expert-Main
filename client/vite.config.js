import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    outDir: "build",
    emptyOutDir: true,
    sourcemap: true,
    target: "esnext",
  },
  server: {
    port: 3000,
  },
});
