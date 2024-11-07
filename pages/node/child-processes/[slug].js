import GenericPost from '../../../components/GenericPost';
import { getGlobalData } from '../../../utils';

const ChildProcessesChild = (props) => {
  console.log('ChildProcessesChild');
  console.log(props);
  return (
    <GenericPost globalData={{ ...props.globalData }}>
      <p>page here</p>
    </GenericPost>
  );
};

export const getStaticProps = async ({ params }) => {
  console.log('node/child-processes/[slug] getStaticProps');
  console.log('params');
  console.log(params);

  const globalData = getGlobalData();
  return {
    props: {
      globalData,
      // source: mdxSource,
      // frontMatter: data,
      slugArr: ['node', 'child-processes', params.slug],
    },
  };
};

export const getStaticPaths = async (props) => {
  console.log('node/child-processes/[slug] getStaticPaths');
  console.log('props');
  console.log(props);

  // const paths = linuxMdPaths
  //   // Remove file extensions for page paths
  //   .map((path) => path.replace(/\.md?$/, ''))
  //   // Map the path into the static paths object required by Next.js
  //   .map((slug) => ({ params: { slug } }));

  return {
    paths: ['/node/child-processes/index'],
    fallback: false,
  };
};

export default ChildProcessesChild;
