import { getGlobalData } from '../../utils/global-data';
import { getPostBySlug, nodeMdPaths } from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

const NODE_VAR = 'node';
export default function NodeBySlug(props) {
  const componentProps = { ...props, ...props.frontMatter };
  return <GenericPost {...componentProps} />;
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug, NODE_VAR);

  return {
    props: {
      globalData,
      frontMatter: data,
      slugArr: [NODE_VAR, ...params.slug],
      source: mdxSource,
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const localPaths = [
    ...nodeMdPaths
      .map((d) => d.params.slug)
      .map((a) => {
        return `/node/${a.join('/')}`;
      }),
  ];

  return {
    paths: localPaths,
    fallback: false,
  };
};
