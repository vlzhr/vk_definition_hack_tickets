const path = require("path");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const { alias, configPaths } = require("react-app-rewire-alias");

const aliasMap = configPaths("./tsconfig.json");

/**
 *
 * @param {import('webpack').Configuration} config
 * @returns
 */
module.exports = function override(config) {
  alias(aliasMap)(config);

  config.resolve.alias["@"] = path.resolve(__dirname, "src");

  config.resolve.extensions.push(".scss", ".css");

  config.resolve.modules.push(path.resolve(__dirname, "src"), "node_modules");

  config.plugins.push(
    new HtmlPlugin({
      template: "./public/index.html",
      filename: "404.html"
    })
  );

  /** POLYFILLS */
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"]
    })
  );

  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    path: require.resolve("path-browserify"),
    url: require.resolve("url")
  };

  config.ignoreWarnings = [
    {
      module: /node_modules\/@rarible/
    },
    {
      module: /node_modules\/@airgap/
    },
    {
      module: /node_modules\/exponential-backoff/
    },
    {
      module: /node_modules\/json-rpc-engine/
    },
    {
      module: /node_modules\/web3/
    },
    {
      module: /node_modules\/xhr2-cookies/
    },
    {
      module: /node_modules\/ethereumjs-abi/
    },
    {
      module: /node_modules\/eth-json-rpc-filters/
    },
    {
      module: /node_modules\/@walletconnect/
    },
    {
      module: /node_modules\/@metamask/
    }
  ];

  return config;
};
