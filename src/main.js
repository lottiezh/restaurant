import Vue from 'vue'
import App from './App.vue'
import QuantityCounter from './components/QuantityCounter.vue'
import PageContent from './components/PageContent.vue'
import Basket from './components/Basket.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'

Vue.config.productionTip = false
Vue.component('qtyCounter', QuantityCounter)
Vue.component('pageContent', PageContent)
Vue.component('Basket', Basket)
Vue.use(VueRouter)

const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')
