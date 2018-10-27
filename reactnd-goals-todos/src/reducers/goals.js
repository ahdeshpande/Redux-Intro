import {ADD_GOAL, REMOVE_GOAL, TOGGLE_GOAL} from "../actions/goals";
import {RECEIVE_DATA} from "../actions/shared";

export default function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter(item => item.id !== action.id);
        case TOGGLE_GOAL:
            return state.map(item => item.id !== action.id ? item :
                Object.assign({}, item, {complete: !item.complete}));
        case RECEIVE_DATA:
            return action.goals;
        default:
            return state
    }
}