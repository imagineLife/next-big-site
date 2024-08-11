export default function NodeFsRoot() {
  return (
    <main>
      <h1>File System Interactions</h1>
      <p>
        Filesystems can be interacted with the `fs` module as well as using the
        `path` module.
      </p>
      <h2>
        <b>filename</b> and <b>dirname</b> for current location
      </h2>
      <p>
        Files and directories &quot;live&quot; at a location which is accessible
        by a path. Lets consider a simple directory structure with a few js
        files to see what the
        <a
          href="https://nodejs.org/dist/latest-v18.x/docs/api/modules.html#__filename"
          _target="blank"
        >
          __filename
        </a>
        and
        <a
          href="https://nodejs.org/dist/latest-v18.x/docs/api/modules.html#__dirname"
          _target="blank"
        >
          __dirname
        </a>
        globally available vars do:
      </p>
      <ul>
        <li>a test dir containing </li>
        <ul>
          <li>an `index.js` file </li>
          <li>
            a directory called `nested`, which contains an `index.js` file{' '}
          </li>
        </ul>
      </ul>
      <p>
        Here&apos;s what the js files will contain: <i>test/index.js</i>
      </p>
      <pre>
        <code>
          require(&apos;./nested&apos;); <br />
          console.log(&apos;root index file&apos;); <br />
          // also log __filename && __dirname
        </code>
      </pre>

      <p>
        Here&apos;s what the js files will contain: <i>test/nested/index.js</i>
      </p>
      <pre>
        <code>
          console.log(&apos;nested index file&apos;); <br />
          // also log __filename && __dirname
        </code>
      </pre>
      <p>
        With a terminal in the `test` dir, after running `node .`, the output
        will show:
      </p>
      <ul>
        <h3>nested index file</h3>
        <li>
          filename: &apos;/Users/my-username/Desktop/test/nested/index.js&apos;
        </li>
        <li>dirname: &apos;/Users/my-username/Desktop/test/nested</li>
      </ul>
      <ul>
        <h3>root index file</h3>
        <li>filename: &apos;/Users/my-username/Desktop/test/index.js&apos;</li>
        <li>dirname: &apos;/Users/my-username/Desktop/test</li>
      </ul>

      <h2>The path module helps with cross-platform paths</h2>
      <p>
        <a
          href="https://nodejs.org/dist/latest-v18.x/docs/api/path.html"
          _target="blank"
        >
          path
        </a>{' '}
        is a native node module that{' '}
        <i>
          &quot;...provides utilities for working with files and directory
          paths...&quot;
        </i>
        <br />
        <a
          href="https://nodejs.org/dist/latest-v18.x/docs/api/path.html"
          _target="blank"
        >
          <i>(thanks node docs!)</i>
        </a>
      </p>
    </main>
  );
}
