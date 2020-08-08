<template>
  <div id="app">
    <HeaderNav />
    <section class="conatiner__body">
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-white;
}

.conatiner__body {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 100vh;
}

.container__content {
  flex: 1 1 600px;
  overflow-y: auto;
  padding: 30px 30px 45px 40px;
  padding: 1rem 1rem 1.5rem 2rem;
}
</style>
