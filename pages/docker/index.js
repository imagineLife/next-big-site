import React, { Fragment } from 'react';
import { getPosts, getGlobalData } from '../../utils';
import Layout from './../../components/layout';
import Hero from './../../components/hero';
// import PageHead from "./../../components/PageHead"
import createLinksWithType from '../../utils/createLinksWithType';
// import './scrum.scss';

/*
  before filter

  re-introduce in frontmatter when done-zo
  order: { gt: 0 }
*/
const DockerIndex = (params) => {
  const intro_max_index = 4;
  const node_max_index = 9;
  const myPages = {
    intro: [],
    node: [],
  };
  params.posts.forEach((p) => {
    if (p.frontmatter.order <= intro_max_index) myPages.intro.push(p);
    else if (
      p.frontmatter.order > intro_max_index &&
      p.frontmatter.order <= node_max_index
    )
      myPages.node.push(p);
  });

  return (
    <Fragment>
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>Docker</h1>
          <a href="/docker#getting-started">Getting Started</a>
          <br />
          <a href="/docker#docker-node-intro">Docker With Node: An Intro</a>
          <h2
            id="getting-started"
            title="Thanks to Brian Holt from Frontend Masters for Sparking some Curiosity here!"
          >
            Getting Started
          </h2>
          {myPages.intro.map(createLinksWithType({ thisType: 'docker-intro' }))}
          <h2 id="docker-node-intro">Docker With Node: An Intro</h2>
          {myPages.node.map(createLinksWithType({ thisType: 'docker-node' }))}
        </section>
      </Layout>
    </Fragment>
  );
};

export default DockerIndex;
// export function Head() {
//   return (
//     <PageHead {...{
//       title: "Docker Blog",
//       excerpt: "A Blog on Learning Docker",
//       slug: 'docker',
//       tags: ["docker", "containers"]
//     }} />
//   );
// }

export function getStaticProps() {
  console.log('---DOCKER getStaticProps');
  const posts = getPosts('docker');
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
