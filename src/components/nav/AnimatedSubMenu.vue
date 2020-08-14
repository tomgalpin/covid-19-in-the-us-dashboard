<template>
  <div>
    <div v-on:click="toggleMenu" class="link__page">
      <a>
        <div class="menu-title">
          <div>
            <i class="fa fa-folder-o" />
            <span>{{ content.title }}</span>
          </div>
          <div class="menu-arrow">
            <i
              :style="[
                showDropdown === false
                  ? { transform: 'rotate(0deg)' }
                  : { transform: 'rotate(90deg)' }
              ]"
              class="fa fa-angle-right"
            />
          </div>
        </div>
      </a>
    </div>
    <ul
      ref="dropdown"
      :class="[showDropdown ? 'show-dropdown' : '']"
      class="dropdown"
    >
      <router-link
        v-for="(item, index) in content.menuItems"
        :key="index"
        class="link__page menu-item"
        tag="li"
        :to="setMenuItemRoute(item.route)"
      >
        <a>
          <div>
            <span>{{ setStateText(item.text) }}</span>
          </div>
        </a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },

  computed: {
    showDropdown() {
      return this.$store.state.showStatesDropdown;
    }
  },

  methods: {
    /**
     * Returns a string that is appended to a route
     * @param {String} string
     * @return {String}
     */
    setMenuItemRoute(string) {
      return `/state/${string}`;
    },

    /**
     * Returns a string with a preceding 'the' article
     * if in array.  Otherwise returns string.
     * @param {String} text
     * @return {String}
     */
    setStateText(text) {
      const articleStates = [
        'District Of Columbia',
        'Northern Mariana Islands',
        'Virgin Islands'
      ];
      const state = articleStates.includes(text) ? `The ${text}` : text;
      return state;
    },

    /**
     * Sets commits/dispatches a Vuex.state mutation 'toggleStatesDropdown'
     * 'toggleStatesDropdown' is set on the Vuex.state so as to handle opening
     * the dropdown from a refresh and/or deeplink.
     */
    toggleMenu() {
      this.$store.commit('toggleStatesDropdown');
    }
  }
};
</script>

<style lang="scss" scoped>
.link__page {
  &.menu-item {
    &.router-link-exact-active {
      border-right: 3px solid $green-bg;
    }

    a {
      font-size: 0.5rem;
      padding: 0.25rem 0.25rem;
    }

    div {
      margin-left: 1.5rem;
    }
  }
}

.dropdown {
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  height: 0;
  line-height: 0;
  padding: 0 1em;

  &.show-dropdown {
    height: 1185px;
    line-height: 1.5;
    padding-top: 1em;
    padding-bottom: 1em;
  }
}

.menu-title {
  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }

  .menu-arrow {
    i {
      transition: transform 0.2s linear;
    }
  }
}
</style>
