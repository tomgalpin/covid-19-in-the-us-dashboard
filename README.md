# Covid-19 in the U.S.
A Vue.js app using Chart.js and https://api.covidtracking.com to display positive cases and deaths.

## Deploy
- Live @: https://tomgalpin.github.io/
  - From: https://github.com/gitname/

## Dependencies
1. `Vue.js`
  - https://vuejs.org/

2. `Vue Router`
  - https://router.vuejs.org/

3. `Vuex`
  - https://vuex.vuejs.org/

4. `Axios`
  - https://github.com/axios/axios

5. `SASS`
  - https://sass-lang.com/

6. `Chart.js`
  - https://www.chartjs.org/
  - https://vue-chartjs.org/

## Structure
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
    └── README.md

## To do:
1.  Refactor Home.vue & move API calls to an outside servie.
2.  Make fully responsive.
3.  Research D3.js to add an interactive, choropleth map.

Notes:
1. Design modeled after:  https://copilot.mistergf.io/
2. Product modeled after:  https://covid19.who.int/
3. Chart.js isn't the best tool.  It was a struggle to wrangle it in.
4. To fair, I am uncertain about the quality of the data in the Covid-19 API I used.



## Project setup
```
yarn install
```
### Compiles and hot-reloads for development
```
yarn serve
```
### Compiles and minifies for production
```
yarn build
```
### Run your unit tests
```
yarn test
```
### Run your code coverage
```
yarn test:coverage
```
### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
