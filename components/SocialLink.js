/*
  used in table-of-contents as links to pages
  - link title
  - link subtext
*/
import React from 'react';
import Link from 'next/link';

const SocialLink = ({ slug, title, excerpt }) => {
  return (
    <div className="toc-card">
      <Link href={`/${slug}`} className="title">
        {title}
      </Link>
      <p className="content">{excerpt}</p>
    </div>
  );
};

export default SocialLink;
