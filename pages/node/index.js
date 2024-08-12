import { getGlobalData, getNodeSections } from '../../utils';

// import {
//   getPrevNextPostBySlug,
//   getPostBySlug,
//   nodeMdPaths,
// } from '../../utils/mdx-utils';
// import GenericPost from '../../components/GenericPost';

const NODE_VAR = 'node';
export default function NodeIndex(props) {
  console.log('props');
  console.log(props);

  return <div>node here</div>;
  // return <GenericPost {...props} />;
}

export const getStaticProps = async ({ params, ...rest }) => {
  const globalData = getGlobalData();
  const nodeSections = getNodeSections();

  // const { mdxSource, data } = await getPostBySlug(params.slug, NODE_VAR);

  // const prevPost = getPrevNextPostBySlug(params.slug, NODE_VAR, 'prev');
  // const nextPost = getPrevNextPostBySlug(params.slug, NODE_VAR, 'next');

  return {
    props: {
      globalData,
      sections: nodeSections,
      // frontMatter: data,
      // nextPost,
      // prevPost,
      // slugArr: [NODE_VAR, params.slug],
      // source: mdxSource,
    },
  };
};
