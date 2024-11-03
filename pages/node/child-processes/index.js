import React from 'react';
import GenericPost from '../../../components/GenericPost';

const ChildProcessesContents = () => (
  <>
    <section className=" node" role="article">
      <p>
        Node includes the{' '}
        <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html">
          child_process module
        </a>
        .<br />
        <a href="/node/process">Processes</a> exist in node. This{' '}
        <code>child_process</code> module allows a dev to create NEW processes!
        The new processes are <em>part of the parent process</em> that created
        the child_process (<em>hence the "child"</em>).
      </p>
      <ul>
        <li>
          <a href="#flexible-processes">Flexible Processes</a>
        </li>
        <li>
          <a href="#many-ways-to-create-a-child_process">
            Many Ways To Create A Child_Process
          </a>
          <ul>
            <li>
              <a href="#exec-spawn-and-fork">Exec, Spawn, And Fork</a>
              <ul>
                <li>
                  <a href="#exec">Exec</a>
                </li>
                <li>
                  <a href="#execfile">ExecFile</a>
                </li>
                <li>
                  <a href="#spawn">Spawn</a>
                </li>
                <li>
                  <a href="#fork">Fork</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#blocking-version">Blocking Version</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#programs-processes-and-threads">
            Programs, Processes, and Threads
          </a>
        </li>
      </ul>
      <h2 id="flexible-processes" style={{ position: 'relative' }}>
        <a
          href="#flexible-processes"
          aria-label="flexible processes permalink"
          className="anchor before"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Flexible Processes
      </h2>
      <p>
        Child_processes run commands.
        <br />
        These can be <em>any executable command</em> in <em>any language!</em>.
        Epic.
        <br />
        The only exception here is thatt the <a href="#fork">fork</a> api runs a
        node process, specifically.
      </p>
      <h2
        id="many-ways-to-create-a-child_process"
        style={{ position: 'relative' }}
      >
        <a
          href="#many-ways-to-create-a-child_process"
          aria-label="many ways to create a child_process permalink"
          className="anchor before"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Many Ways To Create A Child_Process
      </h2>
      <p>More on these below, but here's the node doc links on each:</p>
      <ul>
        <li>
          <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexeccommand-options-callback">
            exec
          </a>{' '}
          and{' '}
          <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecsynccommand-options">
            execSync
          </a>{' '}
          which I give an overview of{' '}
          <a href="/node/child-processes/exec">in this post</a>
        </li>
        <li>
          <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecfilefile-args-options-callback">
            execFile
          </a>{' '}
          and{' '}
          <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecfilesyncfile-args-options">
            execFileSync
          </a>
        </li>
        <li>
          <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processspawncommand-args-options">
            spawn
          </a>{' '}
          and{' '}
          <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processspawnsynccommand-args-options">
            spawnSync
          </a>
        </li>
        <li>
          <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processforkmodulepath-args-options">
            fork
          </a>
        </li>
      </ul>
      <h3 id="exec-spawn-and-fork" style={{ position: 'relative' }}>
        <a
          href="#exec-spawn-and-fork"
          aria-label="exec spawn and fork permalink"
          className="anchor before"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Exec, Spawn, And Fork
      </h3>
      <p>
        Thanks to the{' '}
        <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html">
          node docs
        </a>{' '}
        for much more details on these topics!
        <br />
        These 3 types of apis that node provides are ways to create child
        processes. They each have nuanced differences.
      </p>
      <h4 id="exec" style={{ position: 'relative' }}>
        <a href="#exec" aria-label="exec permalink" className="anchor before">
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Exec
      </h4>
      <p>
        Exec spawns a shell.
        <br />
        Exec then runs a command passed to that shell.
        <br />
        Exec can buffer the data run by the child process and then send the data
        back to the parent process on completion. This can be done with a
        callback function.
      </p>
      <h4 id="execfile" style={{ position: 'relative' }}>
        <a
          href="#execfile"
          aria-label="execfile permalink"
          className="anchor before"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        ExecFile
      </h4>
      <p>
        This is similar to exec.
        <br />
        This does not spawn a shell (
        <em>shell can be enabled with an option key/val pair though</em>).
        Without the shell, this is slightly more efficient than{' '}
        <code>exec</code>.
      </p>
      <h4 id="spawn" style={{ position: 'relative' }}>
        <a href="#spawn" aria-label="spawn permalink" className="anchor before">
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Spawn
      </h4>
      <p>
        This does not spawn a shell.
        <br />
        This streams data to the parent process via eventEmitter events.
        <br />
        There is no limit to the data that can be streamed to the parent
        process.
      </p>
      <h4 id="fork" style={{ position: 'relative' }}>
        <a href="#fork" aria-label="fork permalink" className="anchor before">
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Fork
      </h4>
      <p>
        Fork is like spawn.
        <br />
        Fork spawns <em>node processes</em>.<br />
        Fork, maybe as the most unique approach to child processes, includes the{' '}
        <code>send</code> method to pass data from the parent process to the
        forked process.
        <br />
        Forks have their own memory &amp; v8 processes separate from the parent
        process. This can make forks more expensive than other child-process
        methods.
        <br />
        This <code>fork</code> method seems to me to be, by far, the fastest way
        to manage some async node data workflows between a parent and a child or
        set of child processes.
        <br />
        Perhaps a write-up comparing the two could help me prove this case. (
        <em>
          if that seems interesting to you as a reader,{' '}
          <a href="/about">let me know!</a>
        </em>
        ).
      </p>
      <h3 id="blocking-version" style={{ position: 'relative' }}>
        <a
          href="#blocking-version"
          aria-label="blocking version permalink"
          className="anchor before"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Blocking Version
      </h3>
      <p>
        There are{' '}
        <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#synchronous-process-creation">
          synchronous versions
        </a>{' '}
        of the exec and spawn methods,{' '}
        <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecsynccommand-options">
          execSync
        </a>{' '}
        and{' '}
        <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processspawnsynccommand-args-options">
          spawnSync
        </a>
        .<br />
        The fundamental difference in these apis is that they{' '}
        <a href="/node">block the event loop</a>
      </p>
      <h2 id="programs-processes-and-threads" style={{ position: 'relative' }}>
        <a
          href="#programs-processes-and-threads"
          aria-label="programs processes and threads permalink"
          className="anchor before"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Programs, Processes, and Threads
      </h2>
      <p>
        Thanks to{' '}
        <a href="https://www.youtube.com/watch?v=4rLW7zg21gI">bytebytego</a> for
        a great rundown of this -
      </p>
      <p>
        <strong>A Program</strong> is an executable file. Like a node server.
        Stored as a file on disk.
      </p>
      <p>
        <strong>A Process</strong> is a running program. The program gets
        executed by the processor. Each process is independent of other
        processes: one process can't "corrupt" another process. When one process
        fails or errors, another process will continue, unaffected by the
        failed/err'd process.
      </p>
      <p>
        <strong>A Thread</strong> is a part of a process. Processes have{' '}
        <em>at least 1 thread, the "main" thread.</em> When a program and a
        process use only the main thread, it could be considered
        "single-threaded".
        <br />
        In the context of node, this "single-threaded" approach is how node is
        most commonly talked about.
        <br />
        It is not uncommon for a process, though, to have many threads. Threads
        within a process share memory. inter-thread-communication can happen.
        Because of this connection between threads and the "parent" process, if
        a thread errors the parent process can also encounter errors.
      </p>
    </section>
  </>
);

const ChildProcessesPage = () => (
  <GenericPost
    {...{
      title: 'Learn About Child Processes In Node',
      excerpt: 'interacting with a file-system using node',
      slug: 'node/child-processes',
      tags: ['node', 'core', 'child_process'],
      globalData: { name: 'Node Child Process' },
      slugArr: ['node', 'child-processes'],
    }}
  >
    <ChildProcessesContents />
  </GenericPost>
);
export default ChildProcessesPage;
