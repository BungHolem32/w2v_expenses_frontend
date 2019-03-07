import Vue from 'vue';
import Vuex from 'vuex';
import http from '../api/http';
import currencies from './currencies'


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
    currencies
  }
});

http.httpErrorHandler = (error) => {
    switch (error.response.status) {
        case 401:
            window.location.replace(process.env.VUE_APP_BASE_URL);
            break;

        case 403:
            store.dispatch('showAlert', {
                color: 'error',
                text: 'You don\'t have permission for this operation',
            });
            break;

        case 404:
            store.dispatch('showAlert', {
                color: 'error',
                text: 'This operation is not exists 404',
            });
            break;

        case 500:
            store.dispatch('showAlert', {
                color: 'error',
                text: 'Unknown server Error 500',
            });
            break;

        default:
            throw error;
    }
};

export default store;