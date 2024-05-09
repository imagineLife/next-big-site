import React, { useState, useEffect } from 'react';
import { getGlobalData } from '../../../utils'; //nestedDirs, getNestedPost,
import { IpynbRenderer } from 'react-ipynb-renderer';
import Layout from '../../../components/Layout';
//
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
      import(`/notebooks/${props.slug}.json`).then(setLoadedNotebook);
    }
  }, [loadedNotebook, props.slug]);

  // let props = {
  //   globalData,
  //   source,
  //   tags: frontMatter.tags,
  //   slugArr: ['mongo', ...rest?.slugArr],
  //   ...frontMatter,
  // };

  if (!loadedNotebook) {
    return <>loading...</>;
  }
  return (
    <Layout>
      <IpynbRenderer ipynb={loadedNotebook} />
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
      // slugArr: props.params.slug,
    },
  };
}
