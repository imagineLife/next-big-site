import { getGlobalData } from '../../utils/global-data';
import {
  getMdBySlugs,
  getMdPostSummaries,
  getSiblingTitleSlugs,
} from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

export default function NodeBySlug({
  frontMatter,
  globalData,
  slugArr,
  source,
  siblings,
}) {
  let props = {
    globalData,
    slugArr,
    siblings,
    ...frontMatter,
  };

  return (
    <GenericPost {...props}>
      <div dangerouslySetInnerHTML={{ __html: source }} />
    </GenericPost>
  );
}

export const getStaticProps = async ({ params }) => {
  // console.log('node ...slug getStaticProps params, rest');
  // console.log('params?.slug');
  // console.log(params?.slug);

  const globalData = getGlobalData();
  const siblings = await getSiblingTitleSlugs(['node', ...params.slug]);

  const { title, slug, author, excerpt, tags, contentHtml } =
    await getMdBySlugs(`node/${params.slug[0]}`, params?.slug[1]);

  return {
    props: {
      globalData,
      frontMatter: { title, slug, author, excerpt, tags },
      slugArr: ['node', ...params.slug],
      source: contentHtml,
      siblings,
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  // console.log('node [...slug] getStaticPaths props');
  // console.log(props);

  const newNodePaths = await getMdPostSummaries('node', true);
  return {
    paths: newNodePaths.map((d) => `/${d.slug}`),
    fallback: false,
  };
};
