<template>
  <div class="container__page">
    <div class="container__content">
      <h1>Sorry, the page you are looking for doesn't exist.</h1>
      <div class="container__gif">
        <img
          src="@/assets/images/gifs/lost.gif"
          alt="The little boy from the movie 'Up', eating a chocolate bar, thinking."
        />
      </div>
      <div>
        <router-link tag="a" to="/">Home</router-link>
      </div>
    </div>
  </div>
</template>

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
