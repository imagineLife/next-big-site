import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/themes/prism-solarizedlight.min.css';
// import './../components/Layout.scss';
import './../components/myLayout/index.scss';

// import 'react-ipynb-renderer/dist/styles/default.css';
// import 'react-ipynb-renderer/dist/styles/dark.css';
require('prismjs/themes/prism-solarizedlight.min.css');
//import "react-ipynb-renderer/dist/styles/darkbronco.css";
// import "react-ipynb-renderer/dist/styles/dorkula.css";
//import "react-ipynb-renderer/dist/styles/chesterish.css";
//import "react-ipynb-renderer/dist/styles/grade3.css";
//import "react-ipynb-renderer/dist/styles/gruvboxd.css";
//import "react-ipynb-renderer/dist/styles/gruvboxl.css";
//import "react-ipynb-renderer/dist/styles/monokai.css";
//import "react-ipynb-renderer/dist/styles/oceans16.css";
//import "react-ipynb-renderer/dist/styles/onedork.css";
//import "react-ipynb-renderer/dist/styles/solarizedd.css";
//import "react-ipynb-renderer/dist/styles/solarizedl.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
