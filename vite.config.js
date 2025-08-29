import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Ecommerce/", // 👈 repo ka exact naam, case-sensitive
});
