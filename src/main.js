import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Goods from 'components/goods/goods';
import Ratings from 'components/ratings/ratings';
import Seller from 'components/seller/seller';

import 'common/less/index.less';

Vue.use(VueRouter);
Vue.use(VueResource);
// 路由配置
const routes = [
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller }
];
// 创建路由
const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});
router.push({'path': '/goods'});
/* eslint-disable */
let app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');



/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: {
//     App
//   }
// });
