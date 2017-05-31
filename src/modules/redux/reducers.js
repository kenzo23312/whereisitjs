import { NEXT_STAGE, RECEIVE_COUNTRIES, REQUEST_COUNTRIES } from './actions';
import { combineReducers } from 'redux';

function stage(state = 0, action = {}) {
    switch (action.type) {
        case NEXT_STAGE:
            return action.stage;
        default:
            return state;
    }
}

function countries(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_COUNTRIES:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_COUNTRIES:
            return Object.assign({}, state, {
                isFetching: false,
                items: state.countries,
            })
        default:
            return state;
    }
}

function countriesByContinentId(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COUNTRIES:
        case REQUEST_COUNTRIES:
            return Object.assign({}, state, {
               action: countries(state, action)
            })
        default:
            return state
    }
}

const whereisitApp = combineReducers({ stage, countriesByContinentId });

export default whereisitApp