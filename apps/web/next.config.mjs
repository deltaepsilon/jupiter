import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import withMDX from '@next/mdx';

const mdxOptions = {
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
};

const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
  },

  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  transpilePackages: ['ui'],

  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://www.quiverphotos.com',
        permanent: false,
      },
    ];
  },
};

export default withMDX(mdxOptions)(nextConfig);
