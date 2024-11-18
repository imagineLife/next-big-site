import { getGlobalData } from '../../utils/global-data';
import { getMdBySlugs, getMdPostSummaries } from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

export default function NodeBySlug({
  frontMatter,
  globalData,
  slugArr,
  source,
}) {
  let props = {
    globalData,
    slugArr,
    ...frontMatter,
  };

  return (
    <GenericPost {...props}>
      <div dangerouslySetInnerHTML={{ __html: source }} />
    </GenericPost>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { title, slug, author, excerpt, tags, contentHtml } =
    await getMdBySlugs(`node/${params.slug[0]}`, params?.slug[1]);

  return {
    props: {
      globalData,
      frontMatter: { title, slug, author, excerpt, tags },
      slugArr: ['node', ...params.slug],
      source: contentHtml,
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const newNodePaths = await getMdPostSummaries('node', true);
  return {
    paths: newNodePaths.map((d) => `/${d.slug}`),
    fallback: false,
  };
};
