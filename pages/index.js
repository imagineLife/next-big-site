import Link from 'next/link';

import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout'; //GradientBackground
import { getGlobalData } from '../utils';
import Seo from '../components/Seo';
import useSections from '../hooks/useSections';

function BlogSectionCard({ title, snippet, to, image }) {
  return (
    <Link href={to}>
      <section className=" transition duration-300 max-w-sm rounded overflow-hidden border hover:dark:bg-slate-800 cursor-pointer">
        <section className="py-4 px-8 h-full flex flex-col justify-between">
          <h4 className="text-xl mb-3 font-semibold">{title}</h4>
          <div className="w-full text-center">
            <Image
              src={`/${image}`}
              className="emx-auto"
              width={50}
              height={50}
              alt={`${title} section image`}
            />
          </div>
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400 h-full mt-[50px]">
            {snippet}
          </p>
          {/* className="mt-[56px]" */}
          <section id="footer">
            <hr className="mt-4" />
            <span className="text-xs">ARTICLES</span>
            {/* &nbsp;<span className="text-xs text-gray-500">PROCESS</span> */}
          </section>
        </section>
      </section>
    </Link>
  );
}

const machineLearningProjectPosts = [
  {
    frontmatter: {
      title: 'Object-in-Image Detection',
      excerpt: 'Using Tensorflow & the pre-trained coco-ssd model',
    },
    filePath: 'object-detection-with-uploaded-images',
  },
];
export default function Index({ globalData }) {
  const sections = useSections();
  return (
    <section className="px-[10%]">
      <Layout>
        <div></div>
        <Seo title={globalData.name} description={globalData.blogTitle} />
        <Header name={globalData.name} />
        {/* 80px for nav, 20px for extra */}
        <section id="blog-summary" className="mt-[100px] text-left w-full">
          <p>Welcome to my blog 👋</p>
        </section>
        <main className="mx-auto mt-24 md:mt-18 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {sections.map((s) => (
            <BlogSectionCard {...s} key={`blog-section-${s.title}`} />
          ))}
        </main>
      </Layout>
      <Footer copyrightText={globalData.footerText} />
    </section>
  );
}

export async function getStaticProps() {
  const globalData = getGlobalData();

  return {
    props: {
      globalData,
    },
  };
}
