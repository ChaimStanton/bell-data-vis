import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { chunkSplitPlugin } from "vite-plugin-chunk-split";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // chunkSplitPlugin({ strategy: "default" })
  ],
  base: "./",
  build: {
    // sourcemap: false,
  },
});

// plugins: [react(), chunkSplitPlugin({ strategy: "default" })],
