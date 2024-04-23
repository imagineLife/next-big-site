# Tailwind

A Brief intro to tailwind.  
Tailwind can be configured to be a robust design-system-inspired styling setup. Here, just a beginning.

- [Tailwind](#tailwind)
  - [Utility-First](#utility-first)
  - [Layers](#layers)
    - [Base-Layer POC](#base-layer-poc)
  - [Styling](#styling)
    - [Perhaps common Use-Cases](#perhaps-common-use-cases)
      - [text-sizing](#text-sizing)
      - [colors](#colors)
      - [spacing](#spacing)
      - [pseudo classes](#pseudo-classes)
      - [form states](#form-states)
      - [Official Plugins](#official-plugins)
  - [Theming](#theming)
    - [Extending the Tailwind Base Theme](#extending-the-tailwind-base-theme)
    - [Using Configured Theme Values](#using-configured-theme-values)
  - [Styling a Modal](#styling-a-modal)
  - [Modifiers](#modifiers)
    - [Peer](#peer)
    - [Group](#group)
    - [Before \& After](#before--after)
    - [Dark Mode](#dark-mode)
    - [Responsive Breakpoint](#responsive-breakpoint)
  - [Layouts](#layouts)
    - [Columns](#columns)
  - [Flexbox](#flexbox)

## Utility-First

Tailwind considers its approach a [utility-first](https://tailwindcss.com/docs/utility-first) approach:

- CSS Usage & Web-Development has evolved
- CSS used to be built with custom class names per UI "component": card, card-header, card-body, etc.
- That gets old, tailwind to the rescue
- tailwind classes represent css-applied styling: padding, margin,
  display, shadow... each adjustment (along with the amount per
  adjustment) gets its own "utility class"

## Layers

Native css includes [layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer). Layrs can encapsulate sets of styles. Layer ordering matters: the first _declared order_ of a layer will always take precedence over subsequent layers.  
Tailwind also takes advantage of this "later" principle:

- **base**: some css-reset-like settings called [preflight](https://tailwindcss.com/docs/preflight). These "base" styles are minimal, intentionally
- **components**: "higher-order" composition of styles
- **utilities**: this seems to be perhaps the most-adopted layer. Class names describe the css attributes & settings which are being applied

### Base-Layer POC

A brief illustration using the [tailwind base styles](https://v1.tailwindcss.com/docs/adding-base-styles), the [@layer directive](https://tailwindcss.com/docs/functions-and-directives#layer), and the [@apply directive](https://tailwindcss.com/docs/functions-and-directives#apply):

```css
/* "import" the tailwind "base" */
@tailwind base;

/* v1 */
/* "Extend" the tailwind base layer to specified css selector styles */
@layer base {
  body {
    /* Applying a tailwind utility class */
    @apply m-4;
  }
}
```

## Styling

Generally, a `setting-color-shade` paradigm is how tailwind describes css classes. Some examples:

- `bg-green-500`
- `text-white` (shading not required)
- `p-4`, `px-4`, `py-2`: padding, x is horizontal, y is vertical
- `border-2` `border-darkgreen-300`: both border thickness and color separately
- `h-72` (height of "72"..hmm...), `w-[375px]`: a "one-off" hard-coded width of 375px

### Perhaps common Use-Cases

- Spacing
  - `m-*` is
    - `m-4`: 1rem
    - `m-2`: .5rem
    - `m-8`: 2rem
  - `p-*` does the same

#### text-sizing

- `text-*`
- `text-xs`: font-size: .75rem, line-spacing 1rem
- `text-base`: font-size 1rem, line-spacing 1.5rem

#### colors

- see the "theme" section
- check out color tooling like [uicolors](https://uicolors.app/create), and/or [coolors](coolors.co)

#### spacing

- `space-x-10`: horizontal space between element, using margin
- `divide--y-4`

#### pseudo classes

- `hover:bg-blue-200`: `<hover-state>:tailwind-class`
- `disabled:opacity-30`
- `active:bg-blue-200 active:border-blue-200` (they can work together, just like css!)

#### form states

Here, some buttons as an example: borders, "utility classes", "states"

<!-- layers & tailwind classes -->

```css
@layer base {
  /* ALL buttons get these "default" classes */
  button {
    /* NOTE: "current" is a reserved word
      "current" writes the css reseved keyword "currentColor"
      https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword 
    */
    @apply rounded-md border-2 border-current px-2 py-1 text-blue-700 disabled:opacity-50 hover:opacity-80;
  }
}

/* "utility classes", will overwrite the above base classes when applied */
@layer components {
  .btn-danger {
    @apply text-darkred-600;
  }

  .btn-primary {
    @apply bg-darkblue/50;
  }
}
```

```html
<button className="btn-primary">Submit</button>
<button className="btn-danger">Cancel</button>
```

#### Official Plugins

Tailwind has officially supporting plugins that can be used to abstract-away common use-cases. at the time of writing:

- [typography](https://github.com/tailwindlabs/tailwindcss-typography): exposing a "prose" class for some nice looking font
- [forms](https://github.com/tailwindlabs/tailwindcss-forms): form "reset" and `form-*` class names
- [aspect ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)
- [container queries](https://github.com/tailwindlabs/tailwindcss-container-queries): classes: `@container`, `@lg`, `@md`, `@sm` & more

## Theming

Typically at the root of a repo is [a tailwind config file](https://tailwindcss.com/docs/configuration). This file contains the skeleton to configure [theme details](https://tailwindcss.com/docs/configuration#theme), among other things. ([more docs](https://tailwindcss.com/docs/theme))

### Extending the Tailwind Base Theme

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // add the details in "extend" to the base theme that tailwind provides
    extend: {
      fontFamily: {
        mine: 'Oswald, sans-serif',
      },
      colors: {
        primary: {
          dark: '#CC00CC',
        },
      },
    },
  },
};
```

### Using Configured Theme Values

```html
<!--  
  apply the primary dark setting to the background 
  use the font family 
-->
<h1 class="bg-primary-dark font-mine">Demo Header</h1>
```

## Styling a Modal

Here, tailwind classes "in action".

Starting:

```html
<dialog open>
  <h1>Do Not Pass Go</h1>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in metus
    ornare, volutpat mauris sit amet, ornare est. Praesent massa nulla, lacinia
    sit amet neque sed, ornare porttitor ante. Nunc vulputate ultrices
    sollicitudin. Quisque in tristique felis, vel blandit felis. Aliquam ut
    vestibulum massa. Proin at lectus in risus ultrices interdum a fringilla
    nisi. Maecenas tristique augue at pretium consectetur.
  </p>
  <div>
    <button>Confirm</button>
    <button>Cancel</button>
  </div>
</dialog>
```

With Tailwind classes:

```html
<dialog
  open
  class="w-96 mx-auto bg-white p-4 rounded-md border-2 border-green-500 shadow-md"
>
  <h1 class=" mb-4 font-semibold text-green-600">Do Not Pass Go</h1>
  <p class="texttext-sm mb-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in metus
    ornare, volutpat mauris sit amet, ornare est. Praesent massa nulla, lacinia
    sit amet neque sed, ornare porttitor ante.
  </p>
  <div>
    <!-- bg here, not on 2nd button -->
    <button
      className="rounded border-2 border-green-600 px-2 py-1 bg-green-400"
    >
      Confirm
    </button>
    <button className="rounded border-2 border-green-600 px-2 py-1">
      Cancel
    </button>
  </div>
</dialog>
```

## Modifiers

### Peer

Peer is a sibling element "listener".

```html
<div class="space-y-1">
  <label for="input">Email Address</label>
  <!-- "peer" class on an element to "watch" -->
  <input id="input" type="email" class="peer" placeholder="email address" />
  <!-- peer-* prefix, based on the invalid+focus state of the "peer" class element above -->
  <p class="invisible text-red-600 peer-invalid:visible peer-focus:invisible">
    Valid email required
  </p>
</div>
```

### Group

Group is a child/descendent element "listener".
Here....

- the `li` hase the `group` class
- the child label span has the `group-hover:*` class
- when the `li` is hovered, the child `span` gets adjusted styling

```html
<main class="space-y-4">
  <header>
    <h1 class="text-lg font-bold">Things to Do</h1>
  </header>
  <ul class="space-y-2">
    <li class="group">
      <label>
        <input type="checkbox" class="mr-2 accent-cyan-400" />
        <span class="group-hover:text-cyan-800 group-hover:underline"
          >Buy vegan bacon</span
        >
      </label>
      <button className="invisible group-hover:visible">❌</button>
    </li>
  </ul>
</main>
```

### Before & After

Things like...`before:text-red-200`,`after:content-["after text here"]`,`before:border-2`.  
Here, a `*` is present in the `after` of the label text WHEN the peer input is required (in this case that is true). This is expressed with the class name `peer-required:after:content-['*']`:

```html
<div>
  <input required className="peer border-2 rounded-md border-green p-2" />
  <label className="text-gray peer-required:after:content-['*']"
    >Required input field here</label
  >
</div>
```

### Dark Mode

things like `dark:text-gray-600`, `dark:selection:text-black`

### Responsive Breakpoint

things like `sm`, `md`, `lg`, `xl` and `2xl`.
Breakpoints COULD be a place to use "abstractions", utility classes.

```html
<div
  className="container h-36 bg-hotpink-300 sm:bg-black md:bg-darkred-300 lg:bg-darkgreen-300"
>
  <h2>Title Here</h2>
</div>
```

## Layouts

### Columns

```html
<!-- will display across 2 vertical columns -->
<div className="columns-2">
  <img src="https://picsum.photos/200" />
  <img src="https://picsum.photos/200" />
  <img src="https://picsum.photos/200" />
</div>

<!-- will set "small" columns widths -->
<div className="columns-2 columns-xs">
  <img src="https://picsum.photos/200" />
  <img src="https://picsum.photos/200" />
  <img src="https://picsum.photos/200" />
</div>
```

- `columns-[25px]`
- `gap-1` horizontally between columns
- `space-y-4` vertically between items in each column

## Flexbox
