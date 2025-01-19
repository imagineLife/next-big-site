import Link from "next/link";
import GenericPost from "../../components/GenericPost";
import useAiPaths from "../../hooks/useAiPaths";
export default function PyForDS(){
  const rootPath = '/ai-ml/python-for-data-science'
  const apiPaths = useAiPaths('python-for-data-science')
  
  return <GenericPost {...{
    title: 'Learn Python for DataScience',
    name: 'Learn Python for DataScience',
    slug: '/ai-ml/python-for-data-science',
    tags: [
      'python',
      'data science'
    ],
    slugArr: ['ai-ml','python-for-data-science']
  }}>
    <>
    <p>A handful of jupyter notebooks exploring some python & ML topics:</p>
      {apiPaths.map(o => <Link href={`${rootPath}/${o.path}`} key={`${rootPath}/${o.path}`}><h3>{o.title}</h3></Link>)}
    </>
  </GenericPost>
}