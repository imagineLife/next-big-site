import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

//
// BUILD-TIME functionality
//

// vars with paths to directories containing md[x] files
export const docker_path = path.join(process.cwd(), 'pages', 'docker');
export const ml_path = path.join(process.cwd(), 'pages', 'ml');
const cwd = process.cwd();

// postsFiles is the list of all mdx files inside the posts_path directory
export const dockerMdPaths = readdirSync(docker_path).filter((path) =>
  /\.mdx?$/.test(path)
);

export const mlMdPaths = readdirSync(ml_path).filter((path) =>
  /\.mdx?$/.test(path)
);

const filePaths = {
  docker: dockerMdPaths,
  ml: mlMdPaths,
};
const dirPaths = {
  docker: docker_path,
  ml: ml_path,
};

//
// RUN-TIME functionalities
//

export const sortPostsByDate = (posts) => {
  return posts.sort((a, b) => {
    const aDate = new Date(a.frontmatter.date);
    const bDate = new Date(b.frontmatter.date);
    return bDate - aDate;
  });
};

export const getPosts = (pathDir) => {
  if (!pathDir) throw new Error('getPosts called without a param');
  const pathFilePaths = filePaths[pathDir];
  let posts = pathFilePaths
    .map((filePath) => {
      const source = readFileSync(path.join(dirPaths[pathDir], filePath));
      const { content, data: frontmatter } = matter(source);

      return {
        content,
        frontmatter,
        filePath,
      };
    })
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);

  posts = sortPostsByDate(posts);

  return posts;
};

function filenameFromSlugAndSection(slug, section) {
  return section === 'ml' ? `${slug}.mdx` : `${slug}.md`;
}
export const getPostBySlug = async (slug, section) => {
  const slugString = filenameFromSlugAndSection(slug, section);
  const postFilePath = path.join(dirPaths[section], slugString);
  const source = readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism, rehypeSlug],
    },
    scope: data,
  });

  return { mdxSource, data, postFilePath };
};

export const getPrevNextPostBySlug = (slug, section, prevOrNext) => {
  const posts = getPosts(section);
  const currentFileName = filenameFromSlugAndSection(slug, section);
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post =
    prevOrNext === 'prev'
      ? posts[currentPostIndex - 1]
      : posts[currentPostIndex + 1];

  // no prev post found
  if (!post) return null;

  // const postSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.frontmatter.title,
    slug: post.frontmatter.slug,
  };
};
