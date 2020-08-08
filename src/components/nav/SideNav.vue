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
                  <span class="page-link">Home</span>
                </div>
              </a>
            </router-link>
          </li>
          <li>
            <router-link tag="li" class="link__page" to="/about">
              <a>
                <div>
                  <i class="fa fa-desktop" />
                  <span class="page-link">About</span>
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
export default {};
</script>

<style lang="scss" scoped>
.side-nav {
  display: flex;
  flex: 0 0 150px;
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
  flex: 1 1 auto;
  align-self: center;
  display: flex;
  position: relative;
  padding-left: 1rem;

  a,
  i {
    color: $blue-header;
  }

  a {
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
</style>
