<template>
  <aside class="side-nav">
    <section class="container__content">
      <div>
        <ul>
          <li>
            <router-link tag="div" class="link__page" to="/">
              <a>
                <div>
                  <i class="fa fa-home" />
                  <span>Home</span>
                </div>
              </a>
            </router-link>
          </li>

          <li>
            <AnimatedSubMenu :content="statesMenu" />
          </li>

          <li>
            <router-link tag="div" class="link__page" to="/about">
              <a>
                <div>
                  <i class="fa fa-desktop" />
                  <span>About</span>
                </div>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </aside>
</template>

<script>
import { STATE_CODES } from '@/constants/stateCodes.js';
import AnimatedSubMenu from '@/components/nav/AnimatedSubMenu';

export default {
  components: {
    AnimatedSubMenu
  },

  computed: {
    statesMenu() {
      return {
        menuItems: this.setMenuItems(STATE_CODES),
        title: 'US States'
      };
    }
  },

  methods: {
    /**
     * Set the menu items from STATE_CODES
     * @param {Array} array:  An array of Objects
     * @return {Array}
     */
    setMenuItems(array) {
      const statesArray = Object.values(STATE_CODES);
      const sortedStatesArray = this.sortAlphabetically(statesArray, 'text');

      return sortedStatesArray.map(item => {
        return {
          route: item.id,
          text: item.text
        };
      });
    },

    /**
     * Sort an Array of Objects alphabetically by key.
     * @param {Array} array:  An array of Objects
     * @param {String} string
     * @return {Array}
     */
    sortAlphabetically(array, keySortBy) {
      return array.sort((itemA, itemB) => {
        return itemA[keySortBy].localeCompare(itemB[keySortBy]);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.side-nav {
  display: flex;
  flex: 0 0 200px;
  flex-flow: column nowrap;
  z-index: 30;
  padding: 1rem 0 2rem 0;
  margin-bottom: 5rem;
  justify-content: flex-start;
  background-color: $gray-sidebar;
  overflow-y: scroll;
}

.container__content {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;

  li {
    position: relative;
  }
}

::v-deep .link__page {
  display: flex;
  padding-left: 1rem;

  a,
  i {
    color: $blue-header;
  }

  a {
    width: 100%;
    font-weight: 500;
    font-size: 1rem;
    padding: 0.75rem 0.5rem;
    text-transform: uppercase;
    text-decoration: none;
  }

  i {
    margin-right: 0.75rem;
  }

  &.router-link-exact-active,
  &.show-drop-down,
  &:hover {
    background-color: $gray-sidebar-active;
  }

  &.router-link-exact-active {
    border-right: 3px solid $blue-header;
  }
}
</style>
