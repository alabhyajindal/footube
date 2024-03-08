# FooTube

![FooTube Screenshot on Chromium](/public/screenshot.png)

## Local setup

[FooTube](https://footube.pages.dev/) is a [React](http://react.dev/) application built with [Vite](https://vitejs.dev/). It uses [pnpm](https://pnpm.io/) for package management and [Tailwind CSS](https://tailwindcss.com/) for styling.

Use the following commands to set up the project locally.

```
git clone git@github.com:alabhyajindal/footube.git
cd footube
pnpm install
pnpm run dev
```

## Project Structure

The videos data is stored in `src/assets/videos.js` - which itself is based on the data from a public [Gist](https://gist.github.com/jsturgis/3b19447b304616f18657).

There are two components - both of which are stored under `src/components`. `src/App.jsx` creates the page layout, imports and renders the components. Finally, `src/main.jsx` imports the `App` component and renders it to the DOM.

## Performance

FooTube scores highly on all metrics in Lighthouse for both Desktop and Mobile. There is a room for improvement in Performance because of unoptimized images - which are coming from a third party.

![Lighthouse score](/public/lighthouse.png)
