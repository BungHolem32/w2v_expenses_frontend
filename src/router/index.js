import Vue from 'vue';
import VueRouter from 'vue-router';

import {expense} from './expenses';

Vue.use(VueRouter);

const routes = [ ...expense];
const router = new VueRouter({routes});

router.afterEach((to, from) => {
    window.onbeforeunload = null;
    console.log('from:', from, 'to:', to);
});

export default router;
