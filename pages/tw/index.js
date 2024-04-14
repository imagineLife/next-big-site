import React from 'react';
export default function TailwindRoot() {
  return (
    <main className="prose">
      <h1>Tailwind: Some Details</h1>
      <a href="https://tailwind-workshop.vercel.app/introduction">
        A FrontendMasters slide deck on tailwind (thanks!!)
      </a>
      . <br />
      <a href="https://play.tailwindcss.com/">A Tailwind playground UI!</a>
      {/* 
        layers 
      */}
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
      {/* 
        layers 
      */}
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
      {/* 
        base styles 
      */}
      <h2>Base Styles</h2>
      <p>
        Applying styles to the body tag in a stylesheet is one way to create
        &quot;base&quot; styles.
      </p>
      <p>
        The <b>@layer base</b> directive, in a stylesheet, is another way to
        extend tailwinds built-in &quot;base&quot; layer.
      </p>
      {/* 
        THEMING
      */}
      <h2>Theming</h2>
      <p>
        A config file at the root of the directory,
        &quot;tailwing.config.js&quot;, is where some theme content can be
        defined. A &quot;theme&quot; object can be present, including many keys.
        The tailwind docs have a{' '}
        <a href="https://tailwindcss.com/docs/theme">
          pretty good write-up on theming.
        </a>
      </p>
      {/* 
        Intro To Styles
      */}
      <h2>Intro To Styling Details</h2>
      <p>
        Styles are declared with the built-in class names that tailwind
        provides.
      </p>
      <h3>Colors for Text & Background</h3>
      <ul>
        <li>
          text can be set with &quot;text-color-shade&quot;, i.e text-blue-300.
          tailwind also includes generic sizes like text-sm
        </li>
      </ul>
    </main>
  );
}
