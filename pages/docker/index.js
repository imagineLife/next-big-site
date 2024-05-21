import React, { Fragment } from 'react';
import { getPosts, getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
import PostLink from '../../components/PostLink';

/*
  before filter

  re-introduce in frontmatter when done-zo
  order: { gt: 0 }
*/
const DockerIndex = (params) => {
  const myPages = {
    intro: [],
    node: [],
  };
  params.posts.forEach((p) => {
    if (p.frontmatter.slug.includes('node-')) {
      myPages.node.push(p);
    } else {
      myPages.intro.push(p);
    }
  });

  return (
    <Fragment>
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>Docker</h1>
          <h2
            id="getting-started"
            title="Thanks to Brian Holt from Frontend Masters for Sparking some Curiosity here!"
          >
            Getting Started
          </h2>
          {myPages.intro.map((itm) => (
            <PostLink
              {...itm.frontmatter}
              key={`docker-node-${itm.frontmatter.title}`}
            />
          ))}
          <h2 id="docker-node-intro">Docker With Node: An Intro</h2>
          {myPages.node.map((itm) => (
            <PostLink
              {...itm.frontmatter}
              key={`docker-node-${itm.frontmatter.title}`}
            />
          ))}
        </section>
      </Layout>
    </Fragment>
  );
};

export default DockerIndex;

export function getStaticProps() {
  const posts = getPosts('docker');
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
