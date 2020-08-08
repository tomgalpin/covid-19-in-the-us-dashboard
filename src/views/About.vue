<template>
  <div class="page__about">
    <h1>Covid-19 Data</h1>
    <!-- <h1>{{ test }}</h1> -->
    <div>
      <ul>
        <li>
          <p>
            API:
            <a href="https://about-corona.net/" target="_blank"
              >https://about-corona.net/</a
            >
          </p>
        </li>
        <li>
          <p>File Structure:</p>
          <div>
            <pre>
              <code>{{ fileStructure }}</code>
            </pre>
          </div>
        </li>
        <li><p>Dependencies Used:</p></li>
        <li><p>Code Coverage:</p></li>
      </ul>
    </div>
  </div>
</template>

<script>
import CONSTANTS from '@/constants/aboutPage.js';

export default {
  computed: {
    fileStructure() {
      return CONSTANTS.FILESTRUCTURE;
    }
  },

  created() {
    console.log(41, CONSTANTS.FILESTRUCTURE);
    console.log(42, CONSTANTS.test);
  }
};
</script>

<style lang="scss" scoped>
.page__about {
  * {
    color: $text-gray;
  }
}

h1 {
  margin-bottom: 1.5rem;
}

li {
  margin-bottom: 1rem;
}

pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 6px;
}

code {
  display: inline;
  // max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: 1.5;
  word-wrap: normal;
  background-color: initial;
  border: 0;

  // padding: 0;
  // margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  // border: 0;

  border-radius: 6px;

  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  box-sizing: border-box;
}
</style>
