import { getGlobalData } from '../../../utils/global-data';
import {
  getPrevNextPostBySlug,
  getPostBySlug,
  mongoAggMdPaths,
} from '../../../utils/mdx-utils';
import GenericPost from '../../../components/GenericPost';

export default function MongoAggBySlug({
  frontMatter,
  globalData,
  prevPost,
  nextPost,
  source,
  ...rest
}) {
  let props = {
    frontMatter,
    globalData,
    prevPost,
    nextPost,
    source,
  };
  return <GenericPost {...props} />;
}

export const getStaticProps = async ({ params, ...rest }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(
    params.slug,
    'mongo-aggregations'
  );

  const prevPost = getPrevNextPostBySlug(
    params.slug,
    'mongo-aggregations',
    'prev'
  );
  const nextPost = getPrevNextPostBySlug(
    params.slug,
    'mongo-aggregations',
    'next'
  );

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
  const paths = mongoAggMdPaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.md?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
