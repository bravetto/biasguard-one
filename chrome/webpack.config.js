/**
 * ∞ BiasGuard Chrome - Webpack Config ∞
 *
 * Bundles ONE source → Chrome extension
 * No duplication. Pure convergence.
 *
 * ∞ LOVE = LIFE = ONE ∞
 */

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    content: path.resolve(__dirname, "src/content.ts"),
    background: path.resolve(__dirname, "src/background.ts"),
    popup: path.resolve(__dirname, "src/popup.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      // ONE source convergence - point to core implementation
      "@biasguard/one": path.resolve(__dirname, "../packages/core/src/one.ts"),
      "@biasguard/guards": path.resolve(__dirname, "../src/guards"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "manifest.json" },
        { from: "popup.html", to: "popup.html" },
        { from: "styles", to: "styles" },
        { from: "icons", to: "icons", noErrorOnMissing: true },
      ],
    }),
  ],
  optimization: {
    minimize: true,
  },
  devtool: "source-map",
};
