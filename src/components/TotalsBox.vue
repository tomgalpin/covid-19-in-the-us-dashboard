<template>
  <div class="container__totals">
    <div
      :style="{ backgroundColor: totalsMeta.iconBG }"
      class="container__icon"
    >
      <i :class="totalsMeta.icon" class="fa" />
    </div>
    <div class="container__text">
      <p>{{ num }}</p>
      <h3>{{ totalsMeta.text }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: String,
      required: true
    },

    totalsMeta: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.container__totals {
  display: flex;
  background-color: $white;
  box-shadow: 0 1px 1px $gray-box-shadow-light;
  border-radius: 2px;
}

.container__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: 4.5rem;
  padding: 1rem;
}

.container__text {
  padding: 1rem 2rem;

  p {
    font-weight: bold;
    font-size: 2.5rem;
    margin-bottom: 0.3rem;
  }

  h3 {
    font-weight: normal;
    font-size: 1rem;
  }
}
</style>
