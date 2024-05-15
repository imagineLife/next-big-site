import { getGlobalData } from '../../utils/global-data';
import {
  getPrevNextPostBySlug,
  getPostBySlug,
  scrumMdPaths,
} from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

const SCRUM_VAR = 'scrum';

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
  const { mdxSource, data } = await getPostBySlug(params.slug, SCRUM_VAR);

  const prevPost = getPrevNextPostBySlug(params.slug, SCRUM_VAR, 'prev');
  const nextPost = getPrevNextPostBySlug(params.slug, SCRUM_VAR, 'next');

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
      slugArr: [SCRUM_VAR, params.slug],
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const paths = scrumMdPaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.md?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
