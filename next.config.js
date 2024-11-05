// DOCS
// https://nextjs.org/docs/pages/api-reference/next-config-js/webpack

const createMDX = require('@next/mdx');
const remarkPrism = require('remark-prism');

// txt file
const textLoader = {
  test: /\.txt/,
  type: 'asset/source',
};

// md[x] files
const mdLoader = {
  test: /\.md/,
  use: [
    {
      loader: '@mdx-js/loader',
    },
  ],
};

const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push(textLoader);
    config.module.rules.push(mdLoader);
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

// Add markdown plugins here, as desired
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkPrism],
    // rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
// @ts-ignore
module.exports = withMDX(nextConfig);
