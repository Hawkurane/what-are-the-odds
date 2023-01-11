<template>
  <h1>What are the odds ?</h1>
  <Empire />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Empire from "./components/Empire.vue";

@Options({
  components: {
    Empire: Empire,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
