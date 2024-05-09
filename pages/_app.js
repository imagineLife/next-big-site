import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import './../components/Layout.scss';
import './../components/myLayout/index.scss';
// import 'react-ipynb-renderer/dist/styles/dorkula.css';
// import 'react-ipynb-renderer/dist/styles/dark.css';
import 'react-ipynb-renderer/dist/styles/oceans16.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
