const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  // For example, add typescript loader:
  defaultConfig.module.rules.push({
    test: /\.styl/,
    loaders: ["style-loader", "css-loader", "stylus-loader"],
    include: path.resolve(__dirname, "../")
  });
  defaultConfig.resolve.extensions.push(".styl");

  return defaultConfig;
};