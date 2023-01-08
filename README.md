# react-components-helper

To be installed in your component with
* npm install git+https://github.com/pascal-brand38/react-components-helper.git

Then, to refresh it with latest version, use (note the mandatory options --force and --no-save, otherwise the github reference is lost when reinstalling):
* npm install react-components-helper --force --no-save

It can be useful to use soft link to the github, instead of the npm installation, when developping this package. In such a case, you may need to add in vit configuration:
    server: { fs: { allow: ['..'], } }
to allow out of root dir sources.
