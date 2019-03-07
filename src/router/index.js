import Vue from 'vue';
import VueRouter from 'vue-router';

import {expense} from './expenses';

Vue.use(VueRouter);

const routes = [ ...expense];
const router = new VueRouter({routes});

router.afterEach((to, from) => {
    window.onbeforeunload = null;
});

export default router;
