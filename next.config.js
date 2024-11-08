// DOCS
// https://nextjs.org/docs/pages/api-reference/next-config-js/webpack

// txt file
const textLoader = {
  test: /\.txt/,
  type: 'asset/source',
};

const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push(textLoader);
    // Important: return the modified config
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
        pathname: '/show/**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

module.exports = nextConfig;
