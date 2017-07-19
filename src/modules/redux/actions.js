import fetch from 'isomorphic-fetch'

export const NEXT_STAGE = 'NEXT_STAGE';
export const END_ROUND = 'END_ROUND';
export const END_STAGE = 'END_STAGE';
export const QUESTION_ANSWER = 'QUESTION_ANSWER';
export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES';
export const RECEIVE_COUNTRIES = 'RECEIVE_COUNTRIES';

export function nextStage(stage) {
    return {
        type: NEXT_STAGE,
        stage
    }
} 

export function endStage(isEnd) {
    return {
        type: END_STAGE,
        isEnd,
    }
}  

export function endRound(points) {
    return {
        type: END_ROUND,
        points,
    }
}  

export function questionAnswer(answer, correct, player) {
    return {
        type: QUESTION_ANSWER,
        answer,
        correct,
        player,
    }
} 

export function fetchCountriesByContinent() {
    return (dispatch, getState) => {
        return dispatch(fetchCountries());
    }
}

export function requestCountries() {
    return {
        type: REQUEST_COUNTRIES,
    }
} 

function receiveCountries(json) {
    return {
        type: RECEIVE_COUNTRIES,
        countries: json,
        receivedAt: Date.now()
    }
}

function fetchCountries() {
    return dispatch => {
        let bodyStr = "idContinent=1";

        fetch('https://aqueous-shore-73080.herokuapp.com/countries/cities', {
            method: 'POST',
            body: bodyStr,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        })
        
        .then(function (response) {
            return response.json();
        }).then(function (result) {
            dispatch(receiveCountries(result))
        }).catch(function (error) { });
    }
}
