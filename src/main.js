import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import Vant from 'vant';
import 'vant/lib/index.css';
import {get, post, file, baseUrl} from "./requset/axios.js";

Vue.prototype.$baseUrl = baseUrl; // baseUrl变量
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$file = file;

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
