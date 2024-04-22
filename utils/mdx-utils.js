import fs from 'fs';
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
export const posts_path = path.join(process.cwd(), 'posts');
export const docker_path = path.join(process.cwd(), 'pages', 'docker');
export const ml_path = path.join(process.cwd(), 'pages', 'ml');
const cwd = process.cwd();

// postsFiles is the list of all mdx files inside the posts_path directory
export const postsMdPaths = fs
  .readdirSync(posts_path)
  // Only include md(x) files
  .filter((path) => /\.md?$/.test(path));

export const dockerMdPaths = fs
  .readdirSync(docker_path)
  // Only include md(x) files
  .filter((path) => /\.md?$/.test(path));

export const mlMdPaths = fs
  .readdirSync(ml_path)
  // Only include md(x) files
  .filter((path) => /\.md?$/.test(path));

const filePaths = {
  posts: postsMdPaths,
  docker: dockerMdPaths,
  ml: mlMdPaths,
};
const dirPaths = {
  posts: posts_path,
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

export const getPosts = (pathDir = 'posts') => {
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

export const getPostBySlug = async (slug, section) => {
  // `${slug}.md`
  const postFilePath = path.join(dirPaths[section], `${slug}.md`);
  const source = fs.readFileSync(postFilePath);

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
  const currentFileName = `${slug}.md`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post =
    prevOrNext === 'prev'
      ? posts[currentPostIndex - 1]
      : posts[currentPostIndex + 1];

  // no prev post found
  if (!post) return null;

  const postSlug = post?.filePath.replace(/\.md?$/, '');

  return {
    title: post.frontmatter.title,
    slug: postSlug,
  };
};

export const getPreviousPostBySlug = (slug, section) => {
  const posts = getPosts(section);
  const currentFileName = `${slug}.md`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex + 1];
  if (!post) return null;
  const previousPostSlug = post?.filePath.replace(/\.md?$/, '');
  return {
    title: post.frontmatter.title,
    slug: previousPostSlug,
  };
};
