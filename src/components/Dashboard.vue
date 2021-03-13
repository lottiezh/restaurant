<template>
  <div id="app">
    <bar-chart></bar-chart>
    <call-a-p-i></call-a-p-i>
  </div>
</template>

<script>
import BarChart from './charts/BarChart.vue'
import CallAPI from './CallAPI.vue'
export default {
  name: 'app',
  components: {
    BarChart,
    CallAPI
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>