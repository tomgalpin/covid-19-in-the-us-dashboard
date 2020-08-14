<template>
  <div class="container__page">
    <h1>United States Covid-19 Data</h1>
    <div>
      <ul>
        <li>
          <h2>
            API Used:
          </h2>
          <p>
            <a :href="covidAPI" target="_blank">{{ covidAPI }}</a>
          </p>
        </li>
        <li>
          <h2>File Structure:</h2>
          <div class="container__about file-structure">
            <pre>
              <code>{{ fileStructure }}</code>
            </pre>
          </div>
        </li>
        <li>
          <h2>Dependencies Used:</h2>
          <div class="container__about dependencies">
            <ul>
              <li v-for="(item, index) in dependencies" :key="index">
                <p>
                  <i :class="item.icon" class="fa" />
                  <span>{{ item.name }}</span>
                </p>
                <a :href="item.url" target="_blank">{{ item.url }}</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import API from '@/constants/covidAPI.js';

export default {
  computed: {
    covidAPI() {
      return API.BASE;
    },

    dependencies() {
      return [
        {
          name: 'Vue.js',
          icon: 'fa-sitemap',
          url: 'https://vuejs.org/'
        },
        {
          name: 'Vue Router',
          icon: 'fa-space-shuttle',
          url: 'https://router.vuejs.org/'
        },

        {
          name: 'Vuex',
          icon: 'fa-diamond',
          url: 'https://vuex.vuejs.org/'
        },
        {
          name: 'Axios',
          icon: 'fa-taxi',
          url: 'https://github.com/axios/axios'
        },
        {
          name: 'SASS',
          icon: 'fa-hand-spock-o',
          url: 'https://sass-lang.com/'
        },
        {
          name: 'Chart.js',
          icon: 'fa-bar-chart ',
          url: 'https://www.chartjs.org/'
        }
      ];
    },

    fileStructure() {
      // eslint-disable-next-line no-use-before-define
      const fileStructure = `
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

      return this.trimNewLines(fileStructure);
    }
  },

  methods: {
    /**
     * Trims new line white spaces from multiline string.
     * Adapted from:  https://gist.github.com/zenparsing/5dffde82d9acef19e43c
     * @param  {String}
     * @return {String}
     */
    trimNewLines(string) {
      let size = -1;

      return string.replace(/\n(\s+)/g, (m, m1) => {
        if (size < 0) size = m1.replace(/\t/g, '    ').length;

        return '\n' + m1.slice(Math.min(m1.length, size));
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 1.5rem;
}

h2,
li {
  margin-bottom: 1rem;
}

li {
  &:last-child {
    margin-bottom: 0;
  }
}

h2 {
  color: $text-gray-light;
}

a {
  &:hover {
    text-decoration: none;
  }
}

.container__about {
  padding: 2rem 2rem 2.25rem 2rem;
  border-radius: 6px;

  &.file-structure {
    background-color: $gray-github-code-bg;
    border: 1px solid darken($gray-github-code-bg, 10%);
  }

  &.dependencies {
    background-color: $blue-bg;
    border: 1px solid darken($blue-bg, 10%);
    a,
    i,
    p {
      color: darken($white, 10%);
    }

    i {
      margin-right: 1rem;
    }

    p {
      margin-bottom: 0.25rem;
    }

    a {
      margin-left: 2rem;
    }
  }
}

/*
  'pre' & 'code' styles adapted from Github README styles.
*/
pre {
  font-size: 0.85rem;
  margin: -1rem 0;
}

code {
  display: inline;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: 1.5;
  word-wrap: normal;
  background-color: initial;
  border: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border-radius: 6px;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  box-sizing: border-box;
  color: $black;
}
</style>
