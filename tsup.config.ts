import { defineConfig } from "tsup";

const config = defineConfig({
  entry: ["src/index.ts", "src/styles/styles.css"],
  outDir: "dist",
  format: ["esm", "cjs"],
  external: ["react"],
  clean: true,
  banner: {
    js: `"use client"`,
  },
});

export default config;
