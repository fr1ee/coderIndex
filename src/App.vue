<template>

  <div id="app">
    <link
        href="//at.alicdn.com/t/font_1473335_qgq7rfvhkii.css"
        rel="stylesheet"
        type="text/css"
    />
    <router-view/>
  </div>
</template>

<script>
import "./assets/css/buttonstyle.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/index.css";
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
@import "./assets/css/buttonstyle.css";
@import "./assets/css/bootstrap.css";
@import "./assets/css/index.css";
</style>
