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

# Using from a TS project
In case it is used from a TS project (and in case this component is still a JS one), then follow https://pjausovec.medium.com/how-to-fix-error-ts7016-could-not-find-a-declaration-file-for-module-xyz-has-an-any-type-ecab588800a8:

Create a file src/typings/index.d.ts, with content:

    declare module 'react-components-helper/components/RchGeoCoords';

and then add in tsconfig.json:

    "typeRoots": [
      "./src/typings",
      "./node_modules/@types/"
    ]
