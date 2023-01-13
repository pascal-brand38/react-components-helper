# react-components-helper

To be installed in your component with

    npm install git+https://github.com/pascal-brand38/react-components-helper.git

Then, to refresh it with latest version, use (note the mandatory options --force and --no-save, otherwise the github reference is lost when reinstalling):

    npm install react-components-helper --force --no-save

It can be useful to use soft link to the github, instead of the npm installation, when developping this package. In such a case, you may need to add in vit configuration:

    server: { fs: { allow: ['..'], } }

to allow out of root dir sources.

and in node_modules

    rm -rf react-components-helper
    ln -s ../../react-components-helper

# Using sass / scss

    npm install --save-dev sass

And add in package.json

    "sass": {
      "includePaths": [
        "./node_modules"
      ]
    },

# Using from a TS project
In case it is used from a TS project (and in case this component is still a JS one), then follow https://pjausovec.medium.com/how-to-fix-error-ts7016-could-not-find-a-declaration-file-for-module-xyz-has-an-any-type-ecab588800a8:

Create a file src/typings/index.d.ts, with content:

    declare module 'react-components-helper/components/RchGeoCoords';

and then add in tsconfig.json:

    "typeRoots": [
      "./src/typings",
      "./node_modules/@types/"
    ]
# vite-pages library starter

This is a demo project for [vite-plugin-react-pages](https://github.com/vitejs/vite-plugin-react-pages).
This project demonstrate how to develop a library using vite as your local develop environment.

Notice that we put the **whole** vite-pages project (including config, index.html, .etc) into a sub folder. It makes the root directory cleaner. **This is a neat way to "embed" a vite-pages document project inside your main project.**

You can run this demo in [StackBlitz](https://stackblitz.com/fork/github/vitejs/vite-plugin-react-pages/tree/main/packages/create-project/template-lib?file=README.md&terminal=dev), entirely in your browser!

## How to use

`npm install` or `pnpm install` or `yarn`

`npm run dev` You can play with docs and demos of your packages in local develop environment.

> **Notice the "Components" navigation at the top bar!**

Edit `src/Button/index.tsx` or other source files, the demos will inflect your change instantly.
Edit `src/Button/demos/demo1.tsx` or other demo files, the demos will inflect your change instantly.

`npm run build-docs` The demos are built and served.

`npm run ssr-docs` The app are built into a static site (Static-Site Generation) and served.

`npm run build-lib` Build the library for publishing.

---

Checkout [vite-plugin-react-pages](https://github.com/vitejs/vite-plugin-react-pages) for more info.
