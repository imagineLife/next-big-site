import { getGlobalData } from '../../utils/global-data';
import {
  //   getPrevNextPostBySlug,
  getPostBySlug,
  nodeMdPaths,
} from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

const NODE_VAR = 'node';
export default function NodeBySlug(props) {
  console.log('props');
  console.log(props);

  const componentProps = { ...props, ...props.frontMatter };
  return <GenericPost {...componentProps} />;
}

// { params, ...rest }
export const getStaticProps = async ({ params }) => {
  console.log('getStaticProps params.slug:', params.slug);

  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug, NODE_VAR);

  //   const prevPost = getPrevNextPostBySlug(params.slug, NODE_VAR, 'prev');
  //   const nextPost = getPrevNextPostBySlug(params.slug, NODE_VAR, 'next');

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
  console.log('getStaticPaths props');
  console.log(props);
  console.log('nodeMdPaths');
  console.log(nodeMdPaths.map((d) => d.params.slug));

  return {
    paths: nodeMdPaths,
    // paths: nodeMdPaths.map((d) => ({ params: { slug: d.params.slug } })),
    fallback: false,
  };
};
