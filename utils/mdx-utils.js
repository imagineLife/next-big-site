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
const public_dir = join(cwd, 'public');

// directories in /public/<dir-here>
export const docker_path = join(pages_dir, 'docker');
export const ml_path = join(pages_dir, 'ml');
export const linux_path = join(pages_dir, 'linux');
export const mongo_path = join(pages_dir, 'mongo');
export const nginx_path = join(pages_dir, 'nginx');
export const notebooks_path = join(public_dir, 'notebooks');
export const scrum_path = join(pages_dir, 'scrum');
export const tf_path = join(pages_dir, 'tf');
export const node_path = join(pages_dir, 'node');

function onlyMdxFile(s) {
  return /\.mdx?$/.test(s);
}

function onlyNbFiles(s) {
  return /\.ipynb?$/.test(s);
}
// postsFiles is the list of all mdx files inside the posts_path directory
export const dockerMdPaths = readdirSync(docker_path).filter(onlyMdxFile);
export const mlMdPaths = readdirSync(ml_path).filter(onlyMdxFile);
export const linuxMdPaths = readdirSync(linux_path).filter(onlyMdxFile);
export const notebookPaths = readdirSync(notebooks_path).filter(onlyNbFiles);
// export const nodeMdPaths = readdirSync(node_path).filter(onlyMdxFile);
let nodeDirsToParse = [node_path];
let nodeFilesToParse = [];
let nodeMdPaths = [];
function withParentDirPath(parentDirPath) {
  return function pushDrillOrSkip(item, idx, originalArr) {
    nodeFilesToParse.push(item);

    if (typeof item === 'string' && item.includes('.md')) {
      const preSlug = `${parentDirPath.path}/${parentDirPath.name}`.split(
        'node/'
      )[1];

      nodeMdPaths.push({ params: { slug: [preSlug, item.split('.')[0]] } });
      nodeFilesToParse.pop();
      if (idx === originalArr.length - 1 && nodeDirsToParse.length > 0) {
        // if (nodeDirsToParse.length == 0 && nodeFilesToParse.length === 0) {
        //   console.log('DONE A?!');
        //   console.log(nodeMdPaths);
        // }
        nodeDirsToParse.pop();
      }
    } else if (Boolean(item?.isDirectory) && item?.isDirectory()) {
      const newPath = join(arguments[0].path, item?.name);
      nodeDirsToParse.push(newPath);
      const poppedDir = nodeFilesToParse.pop();
      readdirSync(newPath).forEach(withParentDirPath(poppedDir));
    } else {
      nodeFilesToParse.pop();
      if (idx === originalArr.length - 1) {
        if (nodeDirsToParse.length > 0) {
          nodeDirsToParse.pop();
          // if (nodeDirsToParse.length == 0 && nodeFilesToParse.length === 0) {
          //   console.log('DONE B?!');
          //   console.log(nodeMdPaths);
          // }
          // } else {
          //   console.log('DONE C?!');
          //   console.log(nodeMdPaths.map((f) => f.params.slug));
          // }
        }
      }
    }
  };
}

// readdirSync(nodeDirsToParse.pop(), { withFileTypes: true }).forEach(
//   pushDrillOrSkip
// );
const poppedDirToParse = nodeDirsToParse.pop();
readdirSync(poppedDirToParse, { withFileTypes: true }).forEach(
  withParentDirPath()
);

let nestedDirs = {
  mongo: [],
};
const mongoRootContents = readdirSync(mongo_path, { withFileTypes: true });
mongoRootContents.forEach((mongoRootItem) => {
  // into a directory
  if (mongoRootItem.isDirectory()) {
    const dirContents = readdirSync(join(mongo_path, mongoRootItem.name), {
      withFileTypes: true,
    });
    // items in directory
    dirContents.forEach((nestedItem) => {
      if (nestedItem.name.includes('.md')) {
        nestedDirs.mongo.push(
          join('/', 'mongo', mongoRootItem.name, nestedItem.name)
        );
      } else {
        console.log(
          'SKIPPING pushing to mongo nested content: ',
          nestedItem.name
        );
      }
    });
  }
});

export { nestedDirs };
// export const mongoAggMdPaths = readdirSync(mongo_agg_path).filter(onlyMdxFile);
export const mongoSections = readdirSync(mongo_path, {
  withFileTypes: true,
})
  .filter((s) => s.isDirectory())
  .map((d) => d.name);
export const nginxMdPaths = readdirSync(nginx_path).filter(onlyMdxFile);
export const scrumMdPaths = readdirSync(scrum_path).filter(onlyMdxFile);
export const tfMdPaths = readdirSync(tf_path).filter(onlyMdxFile);

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
  tf: tfMdPaths,
  node: nodeMdPaths,
  notebooks: notebookPaths,
  // 'mongo-aggregations': mongoAggMdPaths,
};
const dirPaths = {
  docker: docker_path,
  node: node_path,
  ml: ml_path,
  linux: linux_path,
  mongo: mongo_path,
  node: node_path,
  nginx: nginx_path,
  scrum: scrum_path,
  tf: tf_path,
  // 'mongo-aggregations': mongo_agg_path,
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

  if (pathDir === 'notebooks') {
    return pathFilePaths.map((s) => s.split('.ipynb')[0]);
  }

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

function filenameFromSlugAndSection(slug, section, useMDX) {
  if (useMDX && section === 'tf') {
    return `${slug}.mdx`;
  }
  const filenameLookup = {
    ml: (s) => `${s}.mdx`,
    docker: (s) => `${s}.md`,
    linux: (s) => `${s}.md`,
    // 'mongo-aggregations': (s) => `${s}.md`,
    node: (s) => `${s}.md`,
    nginx: (s) => `${s}.md`,
    scrum: (s) => `${s}.md`,
    tf: (s) => `${s}.mdx`,
  };
  if (typeof slug === 'object') slug = slug.join('/');
  return filenameLookup[section](slug);
}

export async function getNestedPost() {
  const filePath = `${join(pages_dir, ...arguments[0])}${arguments[1]}`;
  const nodeSource = readFileSync(filePath);
  const { content, data } = matter(nodeSource);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism, rehypeSlug],
    },
    scope: data,
  });
  return { mdxSource, data };
}

export const getPostBySlug = async (slug, section) => {
  const slugString = filenameFromSlugAndSection(slug, section);
  let postFilePath;
  try {
    postFilePath = join(dirPaths[section], slugString);
  } catch (error) {
    postFilePath = join(dirPaths[section], slugString, true);
  }

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

// async
export function getNodeSections() {
  // const nodeSections = readdirSync(node_path, { withFileTypes: true })
  //   .filter((f) => f.isDirectory())
  //   .map((s) => {
  //     const overviewFile = join(node_path, s.name, 'overview.');
  //     const fileContent = readFileSync(overviewFile);
  //     const { data } = matter(fileContent);
  //     return { ...data };
  //   });
  // {t: title, d: description}
  const nodeFs = {
    t: 'FileSystem',
    d: "Interact with the machine's files & directories: read, write, update, & delete.",
    url: '/node/fs',
  };
  const nodeBuffers = {
    t: 'Buffers',
    d: 'Storing temporary data',
    url: '/node/buffers',
  };
  const nodeSections = [nodeFs, nodeBuffers];

  // const mdxSource = await serialize(content, {
  // Optionally pass remark/rehype plugins
  //   mdxOptions: {
  //     remarkPlugins: [remarkGfm],
  //     rehypePlugins: [rehypePrism, rehypeSlug],
  //   },
  //   scope: data,
  // });
  // return { mdxSource, data }

  return nodeSections;
}

export { nodeMdPaths };
