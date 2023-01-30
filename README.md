# react-components-helper

To be installed in your component with

    npm install git+https://github.com/pascal-brand38/react-components-helper.git

or in case a specific branch is required:

    npm install git+https://github.com/pascal-brand38/react-components-helper.git#branch_name


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

# Eslint

    npm install eslint eslint-plugin-react eslint-plugin-react-hooks --save-dev

and .eslintrc.json as

    {
        "env": {
            "browser": true,
            "es2021": true
        },
        "extends": [
            "eslint:recommended",
            "plugin:react/recommended",
            "plugin:react-hooks/recommended",
            "plugin:react/jsx-runtime"    
        ],
        "overrides": [
        ],
        "parserOptions": {
            "ecmaVersion": "latest",
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true
            }
        },
        "plugins": [
            "react"
        ],
        "rules": {
        }
    }

and in package.json scripts section:

    "eslint": "node_modules/.bin/eslint src/**/*.jsx"

eslint is then run using npm run eslint


If interested in automatically run it during npm run dev of vite, then

    npm install --save-dev vite-plugin-eslint

and in vite.config.js (optional - may be a problem as it is run when npm run dev)

    import eslintPlugin from 'vite-plugin-eslint';
    export default defineConfig({
      plugins: [eslintPlugin()],
    });



# Using from a TS project
In case it is used from a TS project (and in case this component is still a JS one), then follow https://pjausovec.medium.com/how-to-fix-error-ts7016-could-not-find-a-declaration-file-for-module-xyz-has-an-any-type-ecab588800a8:

Create a file src/typings/index.d.ts, with content:

    declare module 'react-components-helper/components/RchGeoCoords';

and then add in tsconfig.json:

    "typeRoots": [
      "./src/typings",
      "./node_modules/@types/"
    ]

# Gihub pages
Check https://github.com/gitname/react-gh-pages:

## Setup github pages
go https://github.com/pascal-brand38/<your_git_repo_name>/settings/pages and:
    Source: Deploy from a branch
    Branch:
    Branch: gh-pages
    Folder: / (root)


    npm install gh-pages --save-dev

* in package.json:
  * add a homepage property in this format: /<your_git_repo_name>/
  * add scripts:
    * "predeploy": "npm run build",
    * "deploy": "gh-pages -d dist",   as dist is the result of the build
* in vite.config.js:
    base: '/<your_git_repo_name>/',   // https://dev.to/shashannkbawa/deploying-vite-app-to-github-pages-3ane
* run npm run deploy

then the github page becomes

    https://pascal-brand38.github.io/<your_git_repo_name>


# Visual Studio Code plugins / extensions

* console ninja


# Ideas

* Satelitte location: https://www.n2yo.com/api/
* List of public API: https://publicapis.dev/category/weather
* Test this API for weather: https://www.visualcrossing.com/weather-api


# Work in progress

not working as it is...

## sitemap.xml generation

Check docs at https://github.com/kuflash/react-router-sitemap
and https://github.com/kuflash/react-router-sitemap/blob/master/api.md

Check tutorial at https://www.amitsn.com/blog/how-to-generate-a-sitemap-for-your-react-website-with-dynamic-content

    npm install --save-dev react-router-sitemap --force
    npm install --save-dev babel-cli
    npm install --save-dev babel-preset-es2015
    npm install --save-dev babel-preset-react
    npm install --save-dev babel-register

    mkdir -p utils
    cat > utils/sitemap-builder.js << EOF
      import { sitemapBuilder as buildSitemap } from 'react-router-sitemap';
      const paths = ['/'];
      const hostname = 'https://pascal-brand38.github.io/archives-environnement';
      const sitemap = buildSitemap(hostname, paths);
      sitemap.save('./sitemap.xml')

