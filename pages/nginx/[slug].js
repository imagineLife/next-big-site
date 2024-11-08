import { getGlobalData } from '../../utils/global-data';
import {
  getPrevNextPostBySlug,
  getPostBySlug,
  nginxMdPaths,
} from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

const NX_VAR = 'nginx';
export default function NginxBySlug({
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
  const { mdxSource, data } = await getPostBySlug(params.slug, NX_VAR);

  const prevPost = getPrevNextPostBySlug(params.slug, NX_VAR, 'prev');
  const nextPost = getPrevNextPostBySlug(params.slug, NX_VAR, 'next');

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
      slugArr: [NX_VAR, params.slug],
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const paths = nginxMdPaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.md?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
