import { getGlobalData } from '../../utils/global-data';
import {
  getPrevNextPostBySlug,
  getPostBySlug,
  mlMdPaths,
} from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

export default function DockerBySlug({
  frontMatter,
  globalData,
  prevPost,
  nextPost,
  slugArr,
  source,
  ...rest
}) {
  let props = {
    frontMatter,
    globalData,
    prevPost,
    nextPost,
    slugArr,
    source,
    tags: frontMatter.tags,
  };
  return <GenericPost {...props} />;
}

export const getStaticProps = async ({ params, ...rest }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug, 'ml');

  const prevPost = getPrevNextPostBySlug(params.slug, 'ml', 'prev');
  const nextPost = getPrevNextPostBySlug(params.slug, 'ml', 'next');

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
      slugArr: ['ml', params.slug],
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const paths = mlMdPaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
