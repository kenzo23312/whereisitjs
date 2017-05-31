import fetch from 'isomorphic-fetch'

export const NEXT_STAGE = 'NEXT_STAGE';
export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES';
export const RECEIVE_COUNTRIES = 'RECEIVE_COUNTRIES';

export default function nextStage(stage) {
    return {
        type: NEXT_STAGE,
        stage
    }
}

export function fetchCountriesByContinet() {
    return (dispatch, getState) => {
        return dispatch(fetchCountries());
    }
}

function requestCountries(countries) {
    return {
        type: REQUEST_COUNTRIES,
        countries
    }
}

function receiveCountries(json) {
    return {
        type: RECEIVE_COUNTRIES,
        countries: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function fetchCountries() {
    return dispatch => {
        let bodyStr = "idContinent=1";

        fetch('https://aqueous-shore-73080.herokuapp.com/countries/continentid', {
            method: 'POST',
            body: bodyStr,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(function (response) {
            console.log("Response", response);
            response => response.json();
        }).then(function (json) {
            console.log("Response", json[0].id);
            json => dispatch(receiveCountries(json))
        }).catch(function (error) {
            console.log('Request failed', error);
        });
    }
}
