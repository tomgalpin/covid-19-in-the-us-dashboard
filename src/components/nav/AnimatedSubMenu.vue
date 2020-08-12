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
          <span>{{ item.text }}</span>
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

  data() {
    return {
      showDropdown: false
    };
  },

  methods: {
    toggleMenu() {
      this.showDropdown = !this.showDropdown;
    },

    setMenuItemRoute(string) {
      return `/state/${string}`;
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

    span {
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
  color: transparent;

  &.show-dropdown {
    height: 1185px;
    line-height: 1.5;
    padding-top: 1em;
    padding-bottom: 1em;
    color: black;
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
