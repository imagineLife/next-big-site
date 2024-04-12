export default function TailwindRoot() {
  return (
    <main className="prose">
      <h1>Tailwind: Some Details</h1>
      <a href="https://tailwind-workshop.vercel.app/introduction">
        A FrontendMasters slide deck on tailwind (thanks!!)
      </a>
      . <br />
      <a href="https://play.tailwindcss.com/">A Tailwind playground UI!</a>
      <h2>Utility-First</h2>
      <p>
        <a href="https://tailwindcss.com/docs/utility-first">
          The tailwind docs provide an interesting take
        </a>{' '}
        on &quot;utility first&quot;.
      </p>
      <p>Perhaps a tl:dr</p>
      <ol>
        <li>CSS Usage & Web-Development has evolved</li>
        <li>
          CSS used to be built with custom class names per UI
          &quot;component&quot;: card, card-header, card-body, etc.
        </li>
        <li>That gets old, tailwind to the rescue</li>
        <li>
          tailwind classes represent css-applied styling: padding, margin,
          display, shadow... each adjustment (along with the amount per
          adjustment) gets its own &quot;utility class&quot;
        </li>
      </ol>
      <h2>Layers</h2>
      <p>
        Tailwind, and{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer">
          native css
        </a>
        , have layers:
      </p>
      <ul>
        <li>
          <b>base:</b> some html reset-like settings
        </li>
        <li>
          <b>components:</b> reusable bits for common ui components
        </li>
        <li>
          <b>utilities:</b> perhaps the most-used elements, encapsulating css
          attributes & settings
        </li>
      </ul>
    </main>
  );
}
