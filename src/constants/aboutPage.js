const test = 'tomtom';
const FILESTRUCTURE = `
              .
              ├── /public
              │     └── favicon.ico
              │     └── index.html
              ├── /src
              │     ├── /assets
              │     │     ├── /styles
              │     │     └── /images
              │     ├── /components
              │     │     ├── /nav
              │     │     └── ...
              │     ├── /router
              │     │     └── index.js
              │     ├── /store
              │     │     └── index.js
              │     ├── /views
              │     │     └── index.js
              │     ├── App.vue
              │     └── main.js
              ├── /tests
              │     └── /e2e
              │     └── unit
              ├── babel.config.js
              ├── cypress.json
              ├── package.json
              ├── vue.confid.js
              └── README.md`;

export default { test, FILESTRUCTURE };
