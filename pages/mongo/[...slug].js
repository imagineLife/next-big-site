import React from 'react';
import { nestedDirs, getNestedPost, getGlobalData } from '../../utils';
import GenericPost from '../../components/GenericPost';
// import Layout from './../../components/Layout';
// import Hero from './../../components/hero';
// import Link from 'next/link';
// import ArrowIcon from '../../components/ArrowIcon';

// date,
// const PostLink = ({ slug, title, excerpt }) => (
//   <li className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0 list-none">
//     <Link as={`/mongo/${slug}`} href={`/mongo/[slug]`}>
//       <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
//         {/* {post?.data?.date && (
//           <p className="uppercase mb-3 font-bold opacity-60">
//             {post?.data?.date}
//           </p>
//         )} */}
//         <h2 className="text-2xl md:text-3xl">{title}</h2>
//         {excerpt && <p className="mt-3 text-lg opacity-60">{excerpt}</p>}
//         <ArrowIcon className="mt-4" />
//       </a>
//     </Link>
//   </li>
// );

const MongoBySlug = ({ frontMatter, globalData, source, slugArr, ...rest }) => {
  let props = {
    globalData,
    source,
    tags: frontMatter.tags,
    slugArr,
    ...frontMatter,
  };

  return <GenericPost {...props} />;
};

export default MongoBySlug;

// runs server-side
export const getStaticPaths = async (props) => {
  // console.log(props);
  return {
    paths: nestedDirs.mongo.map((s) => s.replace(/\.md?$/, '')),
    fallback: false,
  };
};

export async function getStaticProps(props) {
  console.log('getStaticProps props');
  console.log(props);

  const { mdxSource, data } = await getNestedPost(
    ['mongo', ...props.params.slug],
    '.md'
  );

  const globalData = getGlobalData();
  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      slugArr: ['mongo', ...props.params.slug],
    },
  };
}
