import React from 'react';
// import { Link } from 'gatsby';
// import './index.scss';

function TagList({ tags }) {
  return (
    <div role="list" className="flex justify-start">
      <i>Tags: </i>
      {tags?.map((t, tidx) => {
        return (
          // <div key={t} className="" role="listitem">
          // <Link to={`/tags/${t}`}>{t}</Link>
          // {t}
          // </div>
          <div
            key={t}
            className="relative grid select-none items-center whitespace-nowrap rounded-lg border border-gray-900 dark:border-white dark:border-opacity-40 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-700 dark:text-white dark:opacity-60 mx-2"
          >
            <span class="">{t}</span>
          </div>
        );
      })}
    </div>
  );
}

export default TagList;
