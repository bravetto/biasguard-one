// tests/one.test.js
// Simple test runner that registers ts-node and requires all .test.ts files in this folder
require("ts-node/register");
const fs = require("fs");
const path = require("path");

const testDir = __dirname;
const files = fs
  .readdirSync(testDir)
  .filter((f) => f.endsWith(".test.ts"))
  .sort();

if (files.length === 0) {
  console.error("No .test.ts files found in tests directory.");
  process.exit(1);
}

files.forEach((f) => {
  console.log(`Loading ${f}`);
  require(path.join(testDir, f));
});
