module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
      isolatedModules: true,
    },
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  preset: "ts-jest",
  transform: {
    ".*\\.(vue)$": require.resolve("vue-jest"),
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts,vue}",
    "!**/*.spec.{js,ts}",
    "!**/*.{d.ts}",
    "!**/{test,dist,node_modules}/**",
  ],
  maxWorkers: 2,
};
