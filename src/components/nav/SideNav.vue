<template>
  <aside class="side-nav">
    <section class="container__content">
      <div class="container__menu">
        <ul>
          <li>
            <router-link tag="li" class="link__page" to="/">
              <a>
                <div>
                  <i class="fa fa-home" />
                  <span>Home</span>
                </div>
              </a>
            </router-link>
          </li>

          <li>
            <div v-on:click="openMenu" class="link__page states-menu">
              <a>
                <div class="menu-title">
                  <div>
                    <i class="fa fa-folder-o" />
                    <span>US States</span>
                  </div>
                  <div class="menu-arrow">
                    <i
                      :style="[
                        showStatesMenu === false
                          ? { transform: 'rotate(0deg)' }
                          : { transform: 'rotate(90deg)' }
                      ]"
                      class="fa fa-angle-right"
                    />
                  </div>
                </div>
              </a>
            </div>
            <ul>
              <li
                v-for="(state, index) in stateCodes"
                :key="index"
                :style="[
                  showStatesMenu === false
                    ? { height: '0' }
                    : { height: '100px' }
                ]"
              >
                <router-link tag="li" class="link__page" to="/about">
                  <a
                    ><span>{{ state.name }}</span></a
                  >
                </router-link>
              </li>
            </ul>
          </li>

          <li>
            <router-link tag="li" class="link__page" to="/about">
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
import stateCodes from '@/constants/stateCodes';
export default {
  data() {
    return {
      showStatesMenu: false
    };
  },

  created() {
    console.log(stateCodes);
    console.log(stateCodes.length);
  },

  computed: {
    stateCodes() {
      return stateCodes;
    }
  },

  methods: {
    openMenu() {
      console.log('clicked');
      console.log(1, this.showStatesMenu);
      this.showStatesMenu = !this.showStatesMenu;
      console.log(2, this.showStatesMenu);
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
  justify-content: flex-start;
  background-color: $gray-sidebar;
}

.container__content {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
}

.link__page {
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
  &:hover {
    background-color: $gray-sidebar-active;
  }

  &.router-link-exact-active {
    border-right: 3px solid $blue-header;
  }
}

.states-menu {
  li {
    // overflow: hidden;
    // transition: height ease 0.6s;

    overflow: hidden;
    height: 0;
    -webkit-transition: height 0.2s ease-in;
    -moz-transition: height 0.2s ease-in;
    -o-transition: height 0.2s ease-in;
    transition: height 0.2s ease-in;

    // &:hover {
    //   height: 100px;
    // }
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
