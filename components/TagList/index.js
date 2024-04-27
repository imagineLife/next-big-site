import React from 'react';
import Link from 'next/link';
function TagList({ tags, hideTitle, linkPattern }) {
  return (
    <div role="list" className="flex flex-wrap justify-start gap-4">
      {!hideTitle && <i>Tags: </i>}
      {tags?.map((t, tidx) => {
        let innerLinkString = linkPattern ? linkPattern(t) : `/tags/${t}`;
        return (
          <div
            key={t}
            className="relative grid select-none items-center whitespace-nowrap rounded-lg border border-gray-900 dark:border-white dark:border-opacity-40 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-700 dark:text-white dark:opacity-60 mx-2"
          >
            {!linkPattern && <span className="">{t}</span>}
            {linkPattern && <Link href={innerLinkString}>{t}</Link>}
          </div>
        );
      })}
    </div>
  );
}

export default TagList;
