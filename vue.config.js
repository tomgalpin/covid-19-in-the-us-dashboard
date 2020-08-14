module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/_variables.scss";`
      }
    }
  },
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/covid-19-in-the-us-dashboard/'
      : '/'
};
