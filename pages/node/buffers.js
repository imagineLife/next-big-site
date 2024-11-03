import React, { useEffect } from 'react';
import Buffers from './../../markdown/node/buffers.md';
import GenericPost from './../../components/GenericPost';
import Prism from 'prismjs';
export default function Page() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <GenericPost
      {...{
        title: 'Buffers',
        excerpt: 'Temporary Data',
        slug: 'node/buffers',
        tags: ['node', 'buffers'],
        globalData: { name: 'Node Buffers' },
        slugArr: ['node', 'buffers'],
      }}
    >
      <Buffers />
    </GenericPost>
  );
}
