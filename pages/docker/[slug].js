import { getGlobalData } from '../../utils/global-data';
import {
  getPrevNextPostBySlug,
  getPostBySlug,
  dockerMdPaths,
} from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

const DOCKER_VAR = 'docker';
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
  const { mdxSource, data } = await getPostBySlug(params.slug, DOCKER_VAR);

  const prevPost = getPrevNextPostBySlug(params.slug, DOCKER_VAR, 'prev');
  const nextPost = getPrevNextPostBySlug(params.slug, DOCKER_VAR, 'next');

  return {
    props: {
      globalData,
      frontMatter: data,
      nextPost,
      prevPost,
      slugArr: [DOCKER_VAR, params.slug],
      source: mdxSource,
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const paths = dockerMdPaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.md?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
