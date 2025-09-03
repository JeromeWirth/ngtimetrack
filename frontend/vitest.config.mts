/// <reference types="vitest" />
import { defineConfig } from "vite";
import angular from "@analogjs/vite-plugin-angular";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [angular(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [],
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});
