<template>
  <div id="app">
    <HeaderNav />
    <section class="container__body">
      <SideNav />
      <div class="container__content">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
import HeaderNav from '@/components/nav/HeaderNav.vue';
import SideNav from '@/components/nav/SideNav.vue';

export default {
  components: {
    HeaderNav,
    SideNav
  }
};
</script>

<style lang="scss" scoped>
.container__body {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 100vh;
}

.container__content {
  flex: 1 1 600px;
  overflow-y: auto;
  padding: 1rem 1rem 1.5rem 2rem;
  background-color: $gray-page-bg;
}

::v-deep .container__page {
  margin-bottom: 5rem;
  min-width: 600px;
  max-width: 1100px;
}
</style>
