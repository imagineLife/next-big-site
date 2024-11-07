import React from 'react';
// import Layout from './../../../components/Layout';
import GenericPost from './../../../components/GenericPost';
import Link from 'next/link';
export default function NodeChildProcessRoot() {
  return (
    // <Layout fullHeight prose>
    <GenericPost
      {...{
        title: 'Node Child Process',
        excerpt: 'Learn About Child Processes in Node',
        slug: 'node/child-processes',
        tags: ['node', 'child_process', 'core'],
        globalData: { name: 'Node Child Processes' },
        slugArr: ['node', 'child-processes'],
      }}
    >
      <p>
        Node includes the{' '}
        <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html">
          child_process module
        </a>
        .<br />
        <Link href="/node/process">Processes</Link> exist in node. This{' '}
        <code>child_process</code> module allows a dev to create NEW processes!
        The new processes are <em>part of the parent process</em> that created
        the child_process (<em>hence the &quot;child&quot;</em>).{' '}
      </p>
      <ul>
        <li>
          <a href="#child-processes">Child Processes</a>
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
        </li>
      </ul>
      <h2 id="flexible-processes">Flexible Processes</h2>
      <p>
        Child_processes run commands.
        <br />
        These can be <em>any executable command</em> in <em>any language!</em>.
        Epic.
        <br />
        The only exception here is thatt the <a href="#fork">fork</a> api runs a
        node process, specifically.{' '}
      </p>
      <h2 id="many-ways-to-create-a-child_process">
        Many Ways To Create A Child_Process
      </h2>
      <p>More on these below, but here&#39;s the node doc links on each:</p>
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
          <Link href="/node/child_processes/exec">in this post</Link>
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
      <h3 id="exec-spawn-and-fork">Exec, Spawn, And Fork</h3>
      <p>
        Thanks to the{' '}
        <a href="https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html">
          node docs
        </a>{' '}
        for much more details on these topics!
        <br />
        These 3 types of apis that node provides are ways to create child
        processes. They each have nuanced differences.{' '}
      </p>
      <h4 id="exec">Exec</h4>
      <p>
        Exec spawns a shell.
        <br />
        Exec then runs a command passed to that shell.
        <br />
        Exec can buffer the data run by the child process and then send the data
        back to the parent process on completion. This can be done with a
        callback function.{' '}
      </p>
      <h4 id="execfile">ExecFile</h4>
      <p>
        This is similar to exec.
        <br />
        This does not spawn a shell (
        <em>shell can be enabled with an option key/val pair though</em>).
        Without the shell, this is slightly more efficient than{' '}
        <code>exec</code>.{' '}
      </p>
      <h4 id="spawn">Spawn</h4>
      <p>
        This does not spawn a shell.
        <br />
        This streams data to the parent process via eventEmitter events.
        <br />
        There is no limit to the data that can be streamed to the parent
        process.
      </p>
      <h4 id="fork">Fork</h4>
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
        ).{' '}
      </p>
      <h3 id="blocking-version">Blocking Version</h3>
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
        <Link href="/node">block the event loop</Link>
      </p>
      <h2 id="programs-processes-and-threads">
        Programs, Processes, and Threads
      </h2>
      <p>
        Thanks to{' '}
        <a href="https://www.youtube.com/watch?v=4rLW7zg21gI">bytebytego</a> for
        a great rundown of this -{' '}
      </p>
      <p>
        <strong>A Program</strong> is an executable file. Like a node server.
        Stored as a file on disk.{' '}
      </p>
      <p>
        <strong>A Process</strong> is a running program. The program gets
        executed by the processor. Each process is independent of other
        processes: one process can&#39;t &quot;corrupt&quot; another process.
        When one process fails or errors, another process will continue,
        unaffected by the failed/err&#39;d process.{' '}
      </p>
      <p>
        <strong>A Thread</strong> is a part of a process. Processes have{' '}
        <em>at least 1 thread, the &quot;main&quot; thread.</em> When a program
        and a process use only the main thread, it could be considered
        &quot;single-threaded&quot;.
        <br />
        In the context of node, this &quot;single-threaded&quot; approach is how
        node is most commonly talked about.
        <br />
        It is not uncommon for a process, though, to have many threads. Threads
        within a process share memory. inter-thread-communication can happen.
        Because of this connection between threads and the &quot;parent&quot;
        process, if a thread errors the parent process can also encounter
        errors.{' '}
      </p>
    </GenericPost>
  );
}
