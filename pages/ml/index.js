import React from 'react';
import { getPosts, getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
import PostLink from '../../components/PostLink';

/*
  before filter

  re-introduce in frontmatter when done-zo
  order: { gt: 0 }
*/
const MlIndex = ({ posts }) => {
  return (
    <>
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>Machine Learning</h1>
          <p>I&apos;m beginning to dabble with some machine learning:</p>
        </section>
        <section>
          {posts?.map((p) => (
            <PostLink
              key={`machine-learning-toc-post-${p.title}`}
              {...p.frontmatter}
            />
          ))}
        </section>
      </Layout>
    </>
  );
};

export default MlIndex;

export function getStaticProps() {
  const posts = getPosts('ml');
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
