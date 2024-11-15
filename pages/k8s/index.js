import React, { Fragment } from 'react';
import { getMdPostSummaries, getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
import PostLink from '../../components/PostLink';

const KubeIndex = (params) => {
  let rootPages = [];
  let inDepthPages = [];

  console.log('params.posts');
  console.log(params.posts);

  // categorize into "Getting Started" and "In-Depth"
  params.posts.forEach((p, pidx) => {
    if (!p.slug.includes('in-depth')) {
      rootPages.push(p);
    } else {
      inDepthPages.push(p);
    }
  });

  return (
    <Fragment>
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>K8s</h1>
          <h2 title="Thanks to Brian Holt from Frontend Masters for Sparking some Curiosity here!">
            Getting Started
          </h2>
          {rootPages?.map((p) => (
            <PostLink {...p} key={`k8s-summary-ling-${p.title}`} />
          ))}
        </section>
      </Layout>
    </Fragment>
  );
};

export default KubeIndex;

export async function getStaticProps() {
  const posts = await getMdPostSummaries('k8s', true);
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
