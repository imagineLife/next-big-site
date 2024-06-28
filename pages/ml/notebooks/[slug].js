import React, { useState, useEffect } from 'react';
import { getGlobalData } from '../../../utils'; //nestedDirs, getNestedPost,
import { IpynbRenderer } from 'react-ipynb-renderer';

import Layout from '../../../components/Layout';
// import Seo from '../../../components/Seo';
import Header from '../../../components/Header';
import BreadCrumbs from '../../../components/Breadcrumbs';
const NotebookBySlug = (props) => {
  console.log('NotebookBySlug props');
  console.log(props);
  let [loadedNotebook, setLoadedNotebook] = useState(null);
  useEffect(() => {
    if (!loadedNotebook) {
      console.log(
        '%c load notebook...',
        'background-color: pink; color: black;'
      );
      import(`/public/notebooks/${props.slug}.json`).then(setLoadedNotebook);
    }
  }, [loadedNotebook, props.slug]);

  if (!loadedNotebook) {
    return <>loading...</>;
  }
  return (
    <Layout>
      {/* <Seo
        title={`${title} - ${globalData.name}`}
        excerpt={excerpt}
        slug={slug}
        tags={tags}
      /> */}
      <Header name={props.globalData.name} />
      <article className="px-6 md:px-0 mt-[80px]">
        <BreadCrumbs slugs={props.slugArr} />
        {/* <BreadCrumbs slugs={['ml']} /> */}
        <main className="mx-auto">
          <IpynbRenderer ipynb={loadedNotebook} />
        </main>
      </article>
    </Layout>
  );
};

export default NotebookBySlug;

// runs server-side
export const getStaticPaths = async (props) => {
  console.log('getStaticPaths props');
  console.log(props);
  return {
    paths: ['/ml/notebooks/TopPages'],
    fallback: false,
  };
  // return {
  //   paths: nestedDirs.mongo.map((s) => s.replace(/\.md?$/, '')),
  //   fallback: false,
  // };
};

export async function getStaticProps(props) {
  console.log('getStaticProps props');
  console.log(props);

  const globalData = getGlobalData();
  return {
    props: {
      globalData,
      slug: props.params.slug,
      // source: mdxSource,
      // frontMatter: data,
      slugArr: ['notebooks', props.params.slug],
    },
  };
}
