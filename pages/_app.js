import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import './../components/Layout.scss';
import './../components/Layout/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
