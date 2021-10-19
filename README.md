# Toolbox

Simple toolbox 🧰 to keep our utility functions that we scatter across several repos and diverge over time.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Documentation](https://img.shields.io/badge/docs-tsdoc-blue.svg)](https://lab5e.github.io/toolbox)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@lab5e/toolbox.svg)](#tiny)
[![toolbox](https://img.shields.io/npm/v/@lab5e/toolbox.svg)](https://www.npmjs.com/package/@lab5e/toolbox)
[![CI](https://github.com/lab5e/toolbox/actions/workflows/main.yml/badge.svg)](https://github.com/lab5e/toolbox/actions/workflows/main.yml)

## Available tools

## CopyToClipboard

A simple promisified version to copy some text to the user clipboard.

```ts
import { copyToClipboard } from "@lab5e/toolbox";

/* Using await */
(async () => {
  await copyToClipboard("Text to clipboard");
  console.log("Success!");
})();

/* Using promise directly */
copyToClipboard("Text to clipboard").then(() => {
  console.log("Success!");
});
```

## Sleep

While not idiomatic, and utterly wrong in most cases, a promisified sleep can always be handy sometimes.

```ts
import { sleep } from "@lab5e/toolbox";

/* Using await */
(async () => {
  await sleep(500);
  console.log("Ah, good to be awake again");
})();

/* Using promise directly */
sleep(500).then(() => {
  console.log("Ah, good to be awake again");
});
```

## Development

We use [TSDX](https://github.com/formium/tsdx) for pretty much everything, and most npm scripts just proxy to `tsdx`.

### Run single build

Use `npm run build`.

### Run tests

To run tests, use `npm test`.

## Configuration

Code quality is set up with `prettier`, `husky`, and `lint-staged`.

### Jest

Jest tests are set up to run with `npm test`.

#### Watch mode

To run in watch mode run `npm run test:watch`

#### Coverage

To see coverage run `npm run test:coverage`

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

### Rollup

We us TSDX which uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

We create UMD, CommonJS, and JavaScript Modules in our build. The appropriate paths are configured in `package.json` and `dist/index.js`

### TypeScript

We use TypeScript for everything, giving us types for all the published packages.

## Continuous Integration

### GitHub Actions

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Publishing to NPM

We use `np`. To publish a new version, write `npx np` and follow the interactive tutorial.
