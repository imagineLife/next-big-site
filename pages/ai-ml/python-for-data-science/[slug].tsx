
import Layout from '../../../components/Layout';
import Header from '../../../components/Header';
import BreadCrumbs from '../../../components/Breadcrumbs/index';
import { IpynbRenderer } from 'react-ipynb-renderer';
import { useEffect, useState } from 'react';

export default function NotebookBySlug(props) {
let [loadedNotebook, setLoadedNotebook] = useState(null);

  useEffect(() => {
    if (!loadedNotebook) {
      const fileToLoad = `/notebooks/ai-ml/python-for-data-science/${props.slug}.ipynb`;

      fetch(fileToLoad)
        .then(async (res) => {
          let jsonRes = await res.json();
          setLoadedNotebook(jsonRes);
        })
        .catch((e) => {
          console.log('error fetching notebook');
          console.log(e);
        });
    }
  }, [loadedNotebook, props.slug]);

  return (
    // @ts-expect-error
    <Layout>
      {/* <Seo
        title={`${title} - ${globalData.name}`}
        excerpt={excerpt}
        slug={slug}
        tags={tags}
      /> */}
      <Header name={'horse'} />
      <article className="px-6 md:px-0 mt-[40px]">
        <BreadCrumbs slugs={props.slugArr} siblings={undefined} />
        <main className="mx-auto p-3">
          {!loadedNotebook && <p>loading...</p>
          }
          {loadedNotebook && <IpynbRenderer ipynb={loadedNotebook} />}
        </main>
      </article>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  console.log('py-for-ds getStaticProps params')
  console.log(params)
  return {
    props: {
      slug: params.slug,
      slugArr: ['ai-ml', 'python-for-data-science' ,params.slug],
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
// props
export const getStaticPaths = () => {
  const rootPath = '/ai-ml/python-for-data-science'
  const paths = ['mean-median-mode', 'std-dev-variance', 'data-distribution', 'percentiles', 'moments', 'covariance-correlation', 'conditional-probability', 'linear-regression', 'polynomial-regression']
  return {
    paths: paths.map(p => `${rootPath}/${p}`),
    fallback: false,
  }
};
