/*
 * For a detailed explanation regarding each configuration property, visit:
 */

export default {
  clearMocks: true,  
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  // força um coverage para todos os arquivos
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js"
  ],
  coverageThreshold: {
    global: {
      branch: 100,
      function: 100,
      line: 100,
      statements: 100
    }
  },
  maxWorkers: "50%",
  testEnvironment: "node",
  watchPathIgnorePatterns: [
    "node_modules"
  ],
  // ganha performance para trabalhar com ecmascript modules
  transformIgnorePatterns: ["node_modules"]
};
