import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout'; //GradientBackground
import ArrowIcon from '../components/ArrowIcon';
import TagList from '../components/TagList';
import { getGlobalData, getBlogSectionSummaries } from '../utils';
import SEO from '../components/SEO';

function PostItem({ post, section }) {
  return (
    <li
      key={post?.filePath}
      className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
    >
      <Link
        as={`/${section}/${post?.filePath.replace(/\.mdx?$/, '')}`}
        href={`/${section}/[slug]`}
      >
        <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
          {post?.data?.date && (
            <p className="uppercase mb-3 font-bold opacity-60">
              {post?.data?.date}
            </p>
          )}
          <h2 className="text-2xl md:text-3xl">{post?.frontmatter?.title}</h2>
          {post?.frontmatter?.excerpt && (
            <p className="mt-3 text-lg opacity-60">
              {post?.frontmatter?.excerpt}
            </p>
          )}
          <ArrowIcon className="mt-4" />
        </a>
      </Link>
    </li>
  );
}
function PostSection({ name, section, posts }) {
  return (
    <>
      <h2 id={`post-section-${name}`}>{name}</h2>
      <ul className="w-full">
        {posts.map((post) => (
          <PostItem
            post={post}
            section={section}
            key={`${section}-post-${post.frontmatter.title}`}
          />
        ))}
      </ul>
    </>
  );
}

export default function Index({ dockerPosts, mlPosts, globalData }) {
  const postSections = [
    { name: 'Docker', posts: dockerPosts, section: 'docker' },
    { name: 'Machine Learning', posts: mlPosts, section: 'ml' },
  ];
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      {/* <main className="w-full mt-24 md:mt-18"> */}
      <main className="container shadow-lg mx-auto mt-24 md:mt-18">
        <ul>
          {/* {postSections.map((ps) => (
            <Link
              href={`#post-section-${ps.name}`}
              key={`#post-section-link-${ps.name}`}
            >
              {ps.name}
            </Link>
          ))} */}
          <TagList
            tags={postSections.map((ps) => ps.name)}
            hideTitle
            linkPattern={(s) => `#post-section-${s}`}
          />
        </ul>
        {postSections.map((ps) => (
          <PostSection key={`post-section-${ps.name}`} {...ps} />
        ))}
      </main>
      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
}

export async function getStaticProps() {
  const dockerPosts = getPosts('docker');
  const mlPosts = getPosts('ml');
  const globalData = getGlobalData();
  const sectionSummaries = await getBlogSectionSummaries();
  console.log('sectionSummaries');
  console.log(sectionSummaries);

  return { props: { dockerPosts, mlPosts, globalData } };
}
