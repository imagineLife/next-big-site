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
  mongo: [
    'aggregations',
    'comparing-to-sql',
    'crud',
    'data-modeling',
    'performance',
    'replication',
    'roles',
    'schema-patterns',
    'sharding',
    'storage-engines',
    'with-docker',
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
export const notebookPaths = readdirSync(notebooks_path).filter(onlyNbFiles);

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

export function getMongoSections() {
  const agg = {
    t: 'Aggregations',
    d: "Perform 'logic' on documents & return computed results",
    url: '/mongo/aggregations',
  };
  const crud = {
    t: 'CRUD',
    d: 'Basic create/read/update/delete documents',
    url: '/mongo/crud',
  };
  const dataModeling = {
    t: 'Data Modeling',
    d: 'Deciding what the data storage shape (schema) could look like',
    url: '/mongo/data-modeling',
  };
  const performance = {
    t: 'Performance',
    d: 'Optimizing how mongo runs',
    url: '/mongo/performance',
  };
  const replication = {
    t: 'Replication',
    d: 'Building a reliable data system with data replication',
    url: '/mongo/replication',
  };
  const roles = {
    t: 'Roles',
    d: 'specifiying permissions for users on db objects',
    url: '/mongo/roles',
  };
  const schemaPatterns = {
    t: 'Schema Patterns',
    d: 'some common approaches to designing data structures',
    url: '/mongo/schema-patterns',
  };
  const sharding = {
    t: 'Sharding',
    d: 'Building a performant data system with sharded data',
    url: '/mongo/sharding',
  };
  const withDocker = {
    t: 'With Docker',
    d: 'Using Docker and MongoDB together',
    url: '/mongo/with-docker',
  };

  return [
    agg,
    crud,
    dataModeling,
    performance,
    replication,
    roles,
    schemaPatterns,
    sharding,
    withDocker,
  ];
}

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

  const nodeCrypto = {
    t: 'Crypto',
    d: 'Encryption & Decryption',
    url: '/node/crypto',
  };

  const nodeChildProc = {
    t: 'Child Processes',
    d: 'Creating & Managing multiple processes',
    url: '/node/child_processes',
  };

  const nodeOs = {
    t: 'OS',
    d: 'Interact with the operating system',
    url: '/node/os',
  };

  const nodeProcess = {
    t: 'Process',
    d: 'Info about the currently-running process',
    url: '/node/process',
  };

  const nodeSections = [
    nodeFs,
    nodeBuffers,
    nodeCrypto,
    nodeChildProc,
    nodeOs,
    nodeProcess,
  ];

  return nodeSections;
}
