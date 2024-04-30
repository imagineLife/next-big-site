import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

//
// RUN-TIME functionalities
//

//
// BUILD-TIME functionality
//

//
// vars
//
const cwd = process.cwd();
const pages_dir = join(cwd, 'pages');

export const docker_path = join(pages_dir, 'docker');
export const ml_path = join(pages_dir, 'ml');
export const linux_path = join(pages_dir, 'linux');
export const mongo_path = join(pages_dir, 'mongo');
export const mongo_agg_path = join(pages_dir, 'mongo', 'aggregations');
export const nginx_path = join(pages_dir, 'nginx');
export const scrum_path = join(pages_dir, 'scrum');

function onlyMdxFile(s) {
  return /\.mdx?$/.test(s);
}

// postsFiles is the list of all mdx files inside the posts_path directory
export const dockerMdPaths = readdirSync(docker_path).filter(onlyMdxFile);
export const mlMdPaths = readdirSync(ml_path).filter(onlyMdxFile);
export const linuxMdPaths = readdirSync(linux_path).filter(onlyMdxFile);
export const mongoMdPaths = readdirSync(mongo_path).filter(onlyMdxFile);
export const mongoAggMdPaths = readdirSync(mongo_agg_path).filter(onlyMdxFile);
export const mongoSections = readdirSync(mongo_path, {
  withFileTypes: true,
})
  .filter((s) => s.isDirectory())
  .map((d) => d.name);
export const nginxMdPaths = readdirSync(nginx_path).filter(onlyMdxFile);
export const scrumMdPaths = readdirSync(scrum_path).filter(onlyMdxFile);

// SKIPPING THESE SECTIONS in index.js
// ml-ui is "hand-written" in the frontend
const skippableSections = {
  tw: true,
  folio: true,
  'ml-ui': true,
  mongo: true,
};

let blogSections = readdirSync(pages_dir, { withFileTypes: true });
blogSections = blogSections
  .filter((dirent) => dirent.isDirectory() && !skippableSections[dirent.name])
  .map((dirent) => dirent.name);

const filePaths = {
  docker: dockerMdPaths,
  ml: mlMdPaths,
  linux: linuxMdPaths,
  nginx: nginxMdPaths,
  scrum: scrumMdPaths,
  'mongo-aggregations': mongoAggMdPaths,
};
const dirPaths = {
  docker: docker_path,
  ml: ml_path,
  linux: linux_path,
  mongo: mongo_path,
  nginx: nginx_path,
  scrum: scrum_path,
  'mongo-aggregations': mongo_agg_path,
};

const nestedSections = {
  mongo: mongoSections,
};

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
      const source = readFileSync(join(dirPaths[pathDir], filePath));
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
  const filenameLookup = {
    ml: (s) => `${s}.mdx`,
    docker: (s) => `${s}.md`,
    linux: (s) => `${s}.md`,
    'mongo-aggregations': (s) => `${s}.md`,
    nginx: (s) => `${s}.md`,
    scrum: (s) => `${s}.md`,
  };
  return filenameLookup[section](slug);
}

export const getPostBySlug = async (slug, section) => {
  const slugString = filenameFromSlugAndSection(slug, section);
  const postFilePath = join(dirPaths[section], slugString);

  let source = readFileSync(postFilePath);
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

export function getNestedSections(section) {
  try {
    return nestedSections[section];
  } catch (e) {
    console.error(e);
    return [];
  }
}
