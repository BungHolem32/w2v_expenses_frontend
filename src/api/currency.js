import http from './http';

export const currency = {
    all(){
        let url = buildCurrencyUrl();

        return http.get(url);
    },
    get(name){
        let url = buildCurrencyUrl(name);

        return http.get(url);
    },
    save(){

    },
    delete(){

    }
};

/**
 *
 * @returns {string|*}
 * @param currencyId
 */
function buildCurrencyUrl(currencyId) {
    let url = 'api/currencies';
    url += currencyId ? `/${currencyId}`: '';

    return url;
}
