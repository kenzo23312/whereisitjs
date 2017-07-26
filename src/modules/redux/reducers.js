import { NEXT_STAGE, END_ROUND, END_STAGE, RECEIVE_COUNTRIES, REQUEST_COUNTRIES, QUESTION_ANSWER } from './actions';

function questionAnswer(state = { answer: -1, player: -1 }, action) {
    switch (action.type) {
        case QUESTION_ANSWER:
            return Object.assign({}, state, {
                questionAnswer: action.answer,
                questionPlayer: action.player
            });
        default:
            return state;
    }
}

function endStage(state = { isEndStage: false }, action) {
    switch (action.type) {
        case END_STAGE:
            return Object.assign({}, state, {
                isEndStage: action.isEnd
            });
        default:
            return state;
    }
}

function endRound(state = { points: 0 }, action) {
    switch (action.type) {
        case END_ROUND:
            return Object.assign({}, state, {
                points: state.points + action.points,
                isEndRound: true
            });
        default:
            return state;
    }
}

function stage(state = { stage: 0 }, action) {
    switch (action.type) {
        case NEXT_STAGE:
            return Object.assign({}, state, {
                stage: action.stage,
                isEndRound: false
            });
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
            return state;
        case RECEIVE_COUNTRIES:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.countries,
            })
        default:
            return state;
    }
}

export function whereisit(state = {}, action) {
    console.log(action.type)
    switch (action.type) {
        case QUESTION_ANSWER:
            return questionAnswer(state, action);
        case END_ROUND:
            return endRound(state, action);
        case END_STAGE:
            return endStage(state, action);
        case NEXT_STAGE:
            return stage(state, action);
        case RECEIVE_COUNTRIES:
        case REQUEST_COUNTRIES:
            return countries(state, action);
        default:
            return state = {
                isEndRound: false,
                points: 0,
                stage: 0,
                questionAnswer: -1,
                questionPlayer: -1,
                isFetching: true,
                isEndStage: false,
                items: []
            }
    }
}

// const whereisitApp = combineReducers({ fetchedCountries });

// export default whereisitApp