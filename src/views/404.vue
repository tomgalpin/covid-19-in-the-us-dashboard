<template>
  <div class="container__page">
    <div class="container__content">
      <h1>Sorry, the page you are looking for doesn't exist.</h1>
      <div class="container__gif">
        <img
          src="@/assets/images/gifs/lost.gif"
          alt="The ittle boy from the movie 'Up', eating a chocolate bar, thinking."
        />
      </div>
      <div>
        <router-link tag="a" to="/">Home</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container__page {
  text-align: center;
}

.container__content {
  width: 80%;
  margin: 0 auto;
}

h1,
.container__gif {
  margin-bottom: 2rem;
}

a {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2rem;

  &:hover {
    text-decoration: none;
  }
}
</style>
