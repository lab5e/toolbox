import vue from "rollup-plugin-vue";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const name = require("./package.json").main.replace(/\.js$/, "");

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
  external: ["vue", "vuetify"],
  inlineDynamicImports: true,
});

const globals = {
  vue: "Vue",
  vuetify: "Vuetify",
};

export default [
  bundle({
    plugins: [
      vue({
        template: {
          isProduction: true,
        },
      }),
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      }),
      commonjs(),
      babel({
        exclude: ["node_modules/**", "*.spec.ts"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
        babelHelpers: "bundled",
        presets: [
          [
            "@babel/preset-env",
            {
              targets: ["current node", "last 2 versions and > 2%"],
            },
          ],
          "@babel/preset-typescript",
        ],
      }),
      terser(),
    ],
    output: [
      {
        sourcemap: true,
        file: `${name}.js`,
        format: "cjs",
        name: "Toolbox",
        exports: "auto",
        globals,
      },
      {
        sourcemap: true,
        file: `${name}.esm.js`,
        format: "esm",
        exports: "named",
      },
      {
        sourcemap: true,
        file: `${name}.min.js`,
        format: "iife",
        name: "Toolbox",
        exports: "auto",
        globals,
      },
    ],
  }),
];
