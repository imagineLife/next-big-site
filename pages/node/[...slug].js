import { getGlobalData } from '../../utils/global-data';
import { getPostBySlug, nodeMdPaths } from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

const NODE_VAR = 'node';
export default function NodeBySlug(props) {
  const componentProps = { ...props, ...props.frontMatter };
  return <GenericPost {...componentProps} />;
}

// { params, ...rest }
export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug, NODE_VAR);

  return {
    props: {
      globalData,
      frontMatter: data,
      // nextPost,
      // prevPost,
      slugArr: [NODE_VAR, ...params.slug],
      source: mdxSource,
    },
  };

  // return { props: {} };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  console.log('pages/node/[...slug].js');
  const localPaths = [
    ...nodeMdPaths
      .map((d) => d.params.slug)
      .map((a) => {
        return `/node/${a.join('/')}`;
      }),
  ];
  console.log('getStaticPaths props');
  console.log(props);
  console.log('localPaths');
  console.log(localPaths);

  return {
    paths: localPaths,
    // paths: nodeMdPaths.map((d) => ({ params: { slug: d.params.slug } })),
    fallback: false,
  };
};
