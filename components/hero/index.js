import React from 'react';
import farmImg from './farm.jpg';
// import './index.scss';
// import { graphql, useStaticQuery } from 'gatsby';
// import BackgroundImage from 'gatsby-background-image';

function Hero({ windowWidth }) {
  // const { image } = useStaticQuery(graphql`
  //   query {
  //     image: file(relativePath: { eq: "farm.jpg" }) {
  //       sharp: childImageSharp {
  //         fluid {
  //           ...GatsbyImageSharpFluid_withWebp
  //         }
  //       }
  //     }
  //   }
  // `);
  return (
    <section
      style={{
        // backgroundImage: farmImg,
        backgroundImage: `url(${farmImg.src})`,
        backgroundPosition: 'center top 20%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        // height: '60vh',
        height: windowWidth < 500 ? '30vh' : `60vh`,
        opacity: '0.99',
      }}
    ></section>
    // <BackgroundImage
    //   Tag="section"
    //   fluid={image.sharp.fluid}
    //   fadeIn="soft"
    //   style={{
    //     backgroundPosition: `top 20% center`,
    //     backgroundSize: 'cover',
    //     height: windowWidth < 500 ? '30vh' : `60vh`,
    //   }}
    //   className="hero"
    // />
  );
}

export default Hero;
