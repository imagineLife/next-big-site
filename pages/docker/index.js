import React, { Fragment } from 'react';
import { getPosts, getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
// import PageHead from "./../../components/PageHead"
import createLinksWithType from '../../utils/createLinksWithType';
// import './scrum.scss';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';

// date,
const PostLink = ({ slug, title, excerpt }) => (
  <li
    key={slug}
    className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0 list-none"
  >
    <Link as={`/${slug}`} href={`/docker/[slug]`}>
      <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
        {/* {post?.data?.date && (
          <p className="uppercase mb-3 font-bold opacity-60">
            {post?.data?.date}
          </p>
        )} */}
        <h2 className="text-2xl md:text-3xl">{title}</h2>
        {excerpt && <p className="mt-3 text-lg opacity-60">{excerpt}</p>}
        <ArrowIcon className="mt-4" />
      </a>
    </Link>
  </li>
);

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

  console.log('myPages.node');
  console.log(myPages.node);

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
            <PostLink {...itm.frontmatter} key={`docker-node-${itm.title}`} />
          ))}
          <h2 id="docker-node-intro">Docker With Node: An Intro</h2>
          {myPages.node.map((itm) => (
            <PostLink {...itm.frontmatter} key={`docker-node-${itm.title}`} />
          ))}
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
