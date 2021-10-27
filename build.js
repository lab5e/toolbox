const { default: vue } = require("esbuild-plugin-vue");

require("esbuild").build({
  entryPoints: ["browser.ts"],
  bundle: true,
  minify: true,
  outfile: "dist/browser.min.js",
  logLevel: "info",
  plugins: [vue()],
  external: ["vue", "vuetify"],
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
  },
});
