import { getGlobalData } from '../../utils/global-data';
import {
  getPrevNextPostBySlug,
  getPostBySlug,
  dockerMdPaths,
} from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

export default function DockerBySlug({
  frontMatter,
  globalData,
  prevPost,
  nextPost,
  source,
  ...rest
}) {
  let props = {
    globalData,
    prevPost,
    nextPost,
    source,
    ...frontMatter,
  };
  return <GenericPost {...props} />;
}

export const getStaticProps = async ({ params, ...rest }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug, 'docker');

  const prevPost = getPrevNextPostBySlug(params.slug, 'docker', 'prev');
  const nextPost = getPrevNextPostBySlug(params.slug, 'docker', 'next');

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
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
