import Buffers from './../../markdown/node/buffers.md';
import GenericPost from './../../components/GenericPost';
export default function Page() {
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
