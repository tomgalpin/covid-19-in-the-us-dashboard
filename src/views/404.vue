<template>
  <div class="container__page">
    <div class="container__content">
      <h1>{{ title }}</h1>
      <div class="container__gif">
        <img
          :src="require(`@/assets/images/gifs/${gif.fileName}`)"
          :alt="gif.alt"
        />
      </div>
      <div>
        <router-link tag="a" to="/">Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    gif() {
      return this.$store.state.errorContent.gif;
    },

    title() {
      return this.$store.state.errorContent.title;
    }
  }
};
</script>

<style lang="scss" scoped>
.container__content {
  width: 80%;
  margin: 1rem auto;
  text-align: center;
}

h1,
.container__gif {
  margin-bottom: 2rem;
}

a {
  font-size: 2rem;

  &:hover {
    text-decoration: none;
  }
}
</style>
