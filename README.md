# iTwin.js web viewer based app with vite.js

This project was created from [official starter app template](https://www.itwinjs.org/learning/tutorials/develop-web-viewer/) and simplified by removing handling of query string params

It's configured with a public `Bay Town Plant` imodel, authentication was changed to get iTwin Sandbox token instead of interactive sign-in. It works in local dev server, but it's not after importing this project to codesandbox.io or Stackblitz. CORS is blocking the request. A hacky workaround is to get auth token manually and paste it as a constant in `Auth.ts` file

## vite.js

This is an experiment to demonstrate that iTwin.js viewer app can be configured with vite.js instead of official webpack + @bentley/react-scripts setup.

`vite.config.ts` contains bare minimum to get the starter app running. I found that handling sass transpilation of iTwin.js libraries is especially problematic, I couldn't find a ready to use vite plugin to cover it. The config has a cheap and dirty resolver, to handle errors that surfaced while running this app, but it's not production ready at all.

iTwin.js viewer needs assets to be copied to `public` folder. There is `vite-plugin-static-copy` plugin which can do that for build output, but it's not making a required copy before starting a local dev server. I used `copyfiles` cli script as a quick workaround.
