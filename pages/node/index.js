import React from 'react';
import Card from './../../components/Card';
import GenericPost from './../../components/GenericPost';
import { getGlobalData, getNodeSections } from '../../utils';

// import {
//   getPrevNextPostBySlug,
//   getPostBySlug,
//   nodeMdPaths,
// } from '../../utils/mdx-utils';

const NODE_VAR = 'node';
export default function NodeIndex({ globalData, sections }) {
  return (
    <GenericPost
      {...{
        title: 'Node ',
        excerpt: 'JavaScript on a server',
        slug: 'node',
        tags: ['node'],
        globalData: { name: 'Node' },
        slugArr: ['node'],
      }}
    >
      <>
        <h1>Node</h1>
        <section className="flex gap-3 p-5">
          {sections?.map((s) => (
            <Card key={s.t} title={s.t} subTitle={s.d} url={s.url} />
          ))}
        </section>
      </>
    </GenericPost>
  );
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
