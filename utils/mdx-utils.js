import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkPrism from 'remark-prism';
import { remark } from 'remark';
import html from 'remark-html';

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
export const linux_path = join(pages_dir, 'linux');
export const mongo_path = join(pages_dir, 'mongo');
export const nginx_path = join(pages_dir, 'nginx');
export const notebooks_path = join(public_dir, 'notebooks');
export const scrum_path = join(pages_dir, 'scrum');
export const node_path = join(pages_dir, 'node');
export const mdDir = join(cwd, 'markdown');
export const dockerMdPath = join(mdDir, 'docker');
export const k8sMdPath = join(mdDir, 'k8s');
export const linuxMdPath = join(mdDir, 'linux');
export const nginxMdPath = join(mdDir, 'nginx');
export const node_md_paths = join(mdDir, 'node');
export const mlMdPath = join(mdDir, 'ml');

function onlyMdxFile(s) {
  return /\.mdx?$/.test(s);
}

async function getFileWithNode(fileSlugString) {
  const splitPathArr = fileSlugString.split('/');
  const fileName = splitPathArr.pop();
  const dir = splitPathArr.join('/');
  const fullFilePath = join(mdDir, dir, `${fileName}.md`);

  const fileContents = readFileSync(fullFilePath, 'utf8');
  return fileContents;
}

export async function getMdBySlugs(mdSlugString) {
  const fileContents = await getFileWithNode(mdSlugString);
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const slugBySection = mdSlugString.split('/');
  // Combine the data with the id and contentHtml
  return {
    id: slugBySection[slugBySection.length - 1],
    contentHtml,
    ...matterResult.data,
  };
}

function onlyNbFiles(s) {
  return /\.ipynb?$/.test(s);
}
// postsFiles is the list of all mdx files inside the posts_path directory
export const dockerMdPaths = readdirSync(dockerMdPath)
  .filter((s) => s.includes('.md'))
  .map((s) => s.replace(/\.md$/, ''))
  .map((s) => `/docker/${s}`);
export const linuxMdPaths = readdirSync(linuxMdPath)
  .filter((s) => s.includes('.md'))
  .map((s) => s.replace(/\.md$/, ''))
  .map((s) => `/linux/${s}`);
export const nginxMdPaths = readdirSync(nginxMdPath)
  .filter((s) => s.includes('.md'))
  .map((s) => s.replace(/\.md$/, ''))
  .map((s) => `/nginx/${s}`);
export const mlMdPaths = readdirSync(mlMdPath)
  .filter((s) => s.includes('.md'))
  .map((s) => s.replace(/\.md$/, ''))
  .map((s) => `/ml/${s}`);

export const k8sMdPaths = readdirSync(k8sMdPath)
  .filter((s) => s.includes('.md'))
  .map((s) => s.replace(/\.md$/, ''))
  .map((s) => `/k8s/${s}`);

export const mdPathsFromDirRoot = (rootStr) =>
  readdirSync(join(mdDir, rootStr))
    .filter((s) => s.includes('.md'))
    .map((s) => s.replace(/\.md$/, ''))
    .map((s) => `/${rootStr}/${s}`);

export const notebookPaths = readdirSync(notebooks_path).filter(onlyNbFiles);
// export const nodeMdPaths = readdirSync(node_path).filter(onlyMdxFile);
let nodeDirsToParse = [node_path, node_md_paths];
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
  linux: linuxMdPaths,
  nginx: nginxMdPaths,
  scrum: scrumMdPaths,
  node: nodeMdPaths,
  notebooks: notebookPaths,
  // 'mongo-aggregations': mongoAggMdPaths,
};
const dirPaths = {
  docker: docker_path,
  node: node_path,
  linux: linux_path,
  mongo: mongo_path,
  node: node_path,
  nginx: nginx_path,
  scrum: scrum_path,
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

// returns list like ['/k8s/architecture-overview']
export const getMdPostSummaries = async (pathDir, includeNestedDirs) => {
  let mdPaths = readdirSync(join(mdDir, pathDir), { withFileTypes: true });
  let nestedDirMdSummaries;
  if (!includeNestedDirs) {
    mdPaths = mdPaths
      .map((d) => d.name)
      .filter((s) => s.includes('.md'))
      .map((s) => s.replace(/\.md$/, ''))
      .map((s) => `/${pathDir}/${s}`);
  } else {
    const nestedDirPaths = mdPaths
      .filter((d) => d.isDirectory())
      .map((d) => `${pathDir}/${d.name}`);

    [nestedDirMdSummaries] = await Promise.all(
      nestedDirPaths.map(getMdPostSummaries)
    );
    mdPaths = mdPaths
      .map((d) => d.name)
      .filter((s) => s.includes('.md'))
      .map((s) => s.replace(/\.md$/, ''))
      .map((s) => `/${pathDir}/${s}`);
  }

  const nextStep = await Promise.all(
    mdPaths.map((p) => getMdBySlugs(p.substring(1)))
  );

  let returning = [];
  if (nestedDirMdSummaries) {
    returning = returning.concat(nestedDirMdSummaries);
  }

  return returning.concat(
    nextStep.map(({ slug, title, excerpt }) => ({
      slug,
      title,
      excerpt,
    }))
  );
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
      remarkPlugins: [remarkGfm, remarkPrism],
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

  const nodeChildProcesses = {
    t: 'Child Processes',
    d: 'spawning, etc.',
    url: '/node/child-processes',
  };
  const nodeSections = [nodeFs, nodeBuffers, nodeChildProcesses];

  return nodeSections;
}

export { nodeMdPaths };
