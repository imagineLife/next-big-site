import { getGlobalData } from '../../utils/global-data';
import { getMdBySlugs, getMdPostSummaries } from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

export default function MongoBySlug({
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
    await getMdBySlugs(`mongo/${params.slug[0]}`, params?.slug[1]);

  return {
    props: {
      globalData,
      frontMatter: { title, slug, author, excerpt, tags },
      slugArr: ['mongo', ...params.slug],
      source: contentHtml,
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const newMongoPaths = await getMdPostSummaries('mongo', true);
  const returnablePaths = newMongoPaths
    .filter((d) => d.slug)
    .map((d) => `/${d.slug}`);

  return {
    paths: returnablePaths,
    fallback: false,
  };
};
