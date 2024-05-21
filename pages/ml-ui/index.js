import React from 'react';
import Layout from './../../components/Layout';
import SEO from '../../components/SEO';
import Header from '../../components/Header';
import { getGlobalData } from '../../utils';

const MlUiIndex = (params) => {
  return (
    <Layout>
      <SEO
        title={params.globalData.name}
        description={params.globalData.blogTitle}
      />
      <Header name={params.globalData.name} />
      <section className="mt-[80px] max-w-[90%]">
        <h1>Machine Learning Projects</h1>
        <p>coming soon...</p>
      </section>
    </Layout>
  );
};

export default MlUiIndex;

export function getStaticProps(p) {
  const globalData = getGlobalData();
  // globalData
  return { props: { globalData } };
}
