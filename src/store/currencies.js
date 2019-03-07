import * as Api from '../api/api';
import * as types from './mutationTypes.js';

const state = {
    currencies: [],
    currentModel: {},
    rate:{}
};

const mutations = {
    [types.SET_CURRENCIES](state, {currencies}) {
        state.currencies = currencies;
    },

    [types.SET_CURRENT_MODEL](state, currentCurrency) {
        state.currentModel = currentCurrency;
    },
};

const actions = {
    getCurrencies: async ({commit}) => {
        const response = await Api.currency.all();
        const currencies = response.data;
        commit(types.SET_CURRENCIES, {currencies});

        return currencies;
    },
    getConversionRateByName :  async ({ commit},name)=> {
        let response = await Api.currency.get(name);

        return response.data;
    }
};

const getters = {

    currencies() {
        return state.currencies;
    },

    currentModel() {
        return state.currentModel;
    },

};

export default {
    state,
    mutations,
    actions,
    getters,
};
