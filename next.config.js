// DOCS
// https://nextjs.org/docs/pages/api-reference/next-config-js/webpack

// txt file
const textLoader = {
  test: /\.txt/,
  type: 'asset/source',
};
module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push(textLoader);
    // Important: return the modified config
    return config;
  },
};
