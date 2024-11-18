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
export const mongo_path = join(pages_dir, 'mongo');
export const notebooks_path = join(public_dir, 'notebooks');
export const mdDir = join(cwd, 'markdown');
export const dockerMdPath = join(mdDir, 'docker');
export const k8sMdPath = join(mdDir, 'k8s');
export const linuxMdPath = join(mdDir, 'linux');
export const nginxMdPath = join(mdDir, 'nginx');
export const scrumMdPath = join(mdDir, 'scrum');
export const node_md_paths = join(mdDir, 'node');
export const mlMdPath = join(mdDir, 'ml');

const introFiles = {
  node: [
    'child_processes',
    'crypto',
    'http-server',
    'modules',
    'os',
    'process',
    'streams',
    'testing',
  ],
};

async function getFileWithNode(fileSlugString) {
  const splitPathArr = fileSlugString.split('/');
  let fullFilePath, fileContents;

  const fileName = splitPathArr.pop();
  const dir = splitPathArr.join('/');

  fullFilePath = join(mdDir, dir, `${fileName}.md`);

  if (introFiles[dir]?.includes(fileName)) {
    fullFilePath = join(mdDir, dir, fileName, `intro.md`);
  }

  fileContents = readFileSync(fullFilePath, 'utf8');
  return fileContents;
}

export async function getMdBySlugs(mdSlugString, nestedDirString) {
  let fileToFind = nestedDirString
    ? `${mdSlugString}/${nestedDirString}`
    : mdSlugString;

  const fileContents = await getFileWithNode(fileToFind);

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
export function mdPathsFromDirRoot(rootStr) {
  return readdirSync(join(mdDir, rootStr))
    .filter((s) => s.includes('.md'))
    .map((s) => s.replace(/\.md$/, ''))
    .map((s) => `/${rootStr}/${s}`);
}

export const dockerMdPaths = mdPathsFromDirRoot('docker');
export const linuxMdPaths = mdPathsFromDirRoot('linux');
export const nginxMdPaths = mdPathsFromDirRoot('nginx');
export const scrumMdPaths = mdPathsFromDirRoot('scrum');
export const mlMdPaths = mdPathsFromDirRoot('ml');
export const k8sMdPaths = mdPathsFromDirRoot('k8s');
export const newNodeMdPaths = mdPathsFromDirRoot('node');
export const notebookPaths = readdirSync(notebooks_path).filter(onlyNbFiles);

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
        // console.log(
        //   'SKIPPING pushing to mongo nested content: ',
        //   nestedItem.name
        // );
      }
    });
  }
});

export { nestedDirs };
export const mongoSections = readdirSync(mongo_path, {
  withFileTypes: true,
})
  .filter((s) => s.isDirectory())
  .map((d) => d.name);

// SKIPPING THESE SECTIONS in index.js
// ml-ui is "hand-written" in the frontend
const skippableSections = {
  tw: true,
  folio: true,
  'ml-ui': true,
  mongo: true,
};

const nestedSections = {
  mongo: mongoSections,
};

export const getPosts = (pathDir) => {
  if (!pathDir) throw new Error('getPosts called without a param');
  return notebookPaths.map((s) => s.split('.ipynb')[0]);
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

    nestedDirMdSummaries = await Promise.all(
      nestedDirPaths.map(getMdPostSummaries)
    );

    mdPaths = mdPaths
      .map((d) => d.name)
      .filter((s) => s.includes('.md'))
      .map((s) => s.replace(/\.md$/, ''))
      .map((s) => `/${pathDir}/${s}`);
  }

  const listOfMdContents = await Promise.all(
    mdPaths.map((p) => getMdBySlugs(p.substring(1)))
  );

  let returning = [];
  if (nestedDirMdSummaries) {
    nestedDirMdSummaries.forEach((arr) => {
      returning = returning.concat(arr);
    });
  }

  return returning.concat(
    listOfMdContents.map(({ slug, title, excerpt }) => ({
      slug,
      title,
      excerpt,
    }))
  );
};

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
