module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/_variables.scss";`
      }
    }
  },
  publicPath: '/covid-19-in-the-us-dashboard/'
};
