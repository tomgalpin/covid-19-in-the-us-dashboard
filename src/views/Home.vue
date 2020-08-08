<template>
  <div class="container__page">
    <div><img alt="Vue logo" src="../assets/logo.png" /></div>
    <div><img alt="Vue logo" src="../assets/logo.png" /></div>
    <div><img alt="Vue logo" src="../assets/logo.png" /></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    axios.get('https://corona-api.com/countries').then(response => {
      console.log(response);
    });
  }
};
</script>

<style lang="scss" scoped></style>
