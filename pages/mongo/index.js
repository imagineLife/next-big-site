import React, { Fragment } from 'react';
import { getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';

// date,
const PostLink = ({ slug, title, excerpt }) => (
  <li className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0 list-none">
    <Link as={`${slug}`} href={`[${slug}]`}>
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
const MongoIndex = (props) => {
  const sections = [
    {
      title: 'Data Modeling',
      excerpt: 'Leveraging the document model for application performance',
      slug: '/mongo/data-modeling/intro',
    },
  ];
  return (
    <Fragment>
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>Mongo</h1>
          <p>
            While studying to get the{' '}
            <Link
              target="_blank"
              href="https://university.mongodb.com/certified_professional_finder/certified_professionals/793573?name=laursen"
            >
              MongoDB Certified Developer
            </Link>
            certification, I did a bit of writing...
          </p>
          {sections?.map(({ slug, title, excerpt }) => (
            <PostLink
              key={`mongo-section-${slug}`}
              slug={slug}
              title={title.charAt(0).toUpperCase() + title.slice(1)}
              excerpt={excerpt}
            />
          ))}
        </section>
      </Layout>
    </Fragment>
  );
};

export default MongoIndex;

export function getStaticProps() {
  const globalData = getGlobalData();
  // globalData
  return { props: { globalData } };
}
