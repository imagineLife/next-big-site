# Tailwind

- [Tailwind](#tailwind)
  - [Utility-First](#utility-first)
  - [Layers](#layers)
    - [Base-Layer POC](#base-layer-poc)
  - [Theming](#theming)
    - [Extending the Tailwind Base Theme](#extending-the-tailwind-base-theme)
    - [Using Configured Theme Values](#using-configured-theme-values)

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
