import { getGlobalData } from '../../utils/global-data';
import {
  getPrevNextPostBySlug,
  getPostBySlug,
  linuxMdPaths,
} from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

export default function LinuxBySlug({
  frontMatter,
  globalData,
  prevPost,
  nextPost,
  slugArr,
  source,
  ...rest
}) {
  let props = {
    globalData,
    prevPost,
    nextPost,
    slugArr,
    source,
    ...frontMatter,
  };
  return <GenericPost {...props} />;
}

export const getStaticProps = async ({ params, ...rest }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug, 'linux');

  const prevPost = getPrevNextPostBySlug(params.slug, 'linux', 'prev');
  const nextPost = getPrevNextPostBySlug(params.slug, 'linux', 'next');

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
      slugArr: ['linux', params.slug],
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const paths = linuxMdPaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.md?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  console.log('paths');
  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};
