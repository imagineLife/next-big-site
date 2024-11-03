import GenericPost from '../../../components/GenericPost';
import { getGlobalData } from '../../../utils';

const ChildProcessesChild = () => (
  <GenericPost>
    <p>page here</p>
  </GenericPost>
);

export const getStaticProps = async ({ params }) => {
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
  // const paths = linuxMdPaths
  //   // Remove file extensions for page paths
  //   .map((path) => path.replace(/\.md?$/, ''))
  //   // Map the path into the static paths object required by Next.js
  //   .map((slug) => ({ params: { slug } }));

  return {
    paths: [],
    fallback: false,
  };
};

export default ChildProcessesChild;
