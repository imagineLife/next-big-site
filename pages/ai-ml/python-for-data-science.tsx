import Link from "next/link";
import GenericPost from "../../components/GenericPost";

export default function PyForDS(){
  const rootPath = '/ai-ml/python-for-data-science'
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
      <Link href={`${rootPath}/mean-median-mode`}><h2>Mean, Median, & Mode</h2></Link>
    </>
  </GenericPost>
}