import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';

//
// BUILD-TIME functionality
//

// posts_path is useful when you want to get the path to a specific file
export const posts_path = path.join(process.cwd(), 'posts');
export const docker_path = path.join(process.cwd(), 'pages', 'docker');
const cwd = process.cwd();
console.log('cwd');
console.log(cwd);
console.log({
  posts_path,
  docker_path,
});

// postsFiles is the list of all mdx files inside the posts_path directory
export const postsMdPaths = fs
  .readdirSync(posts_path)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const dockerMdPaths = fs
  .readdirSync(docker_path)
  // Only include md(x) files
  .filter((path) => /\.md?$/.test(path));

const filePaths = {
  posts: postsMdPaths,
  docker: dockerMdPaths,
};
const dirPaths = {
  posts: posts_path,
  docker: docker_path,
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

export const getPosts = (pathDir = 'posts') => {
  console.log('---getPosts---- pathDir:', pathDir);
  const pathFilePaths = filePaths[pathDir];

  // const filePathToUse = optionalDirPath : ?
  let posts = pathFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(dirPaths[pathDir], filePath));
    const { content, data: frontmatter } = matter(source);

    return {
      content,
      frontmatter,
      filePath,
    };
  });

  posts = sortPostsByDate(posts);

  return posts;
};

export const getPostBySlug = async (slug) => {
  const postFilePath = path.join(posts_path, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return { mdxSource, data, postFilePath };
};

export const getNextPostBySlug = (slug) => {
  console.log('getNextPostBySlug');

  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex - 1];
  // no prev post found
  if (!post) return null;

  const nextPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: nextPostSlug,
  };
};

export const getPreviousPostBySlug = (slug) => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex + 1];
  // no prev post found
  if (!post) return null;

  const previousPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: previousPostSlug,
  };
};
