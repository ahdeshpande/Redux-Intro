function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const TOGGLE_GOAL = 'TOGGLE_GOAL';

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

function toggleGoalAction(id) {
    return {
        type: TOGGLE_GOAL,
        id,
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter(item => item.id !== action.id);
        case TOGGLE_TODO:
            return state.map(item => item.id !== action.id ? item :
                Object.assign({}, item, {complete: !item.complete}));
        default:
            return state
    }
}


function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter(item => item.id !== action.id);
        case TOGGLE_GOAL:
            return state.map(item => item.id !== action.id ? item :
                Object.assign({}, item, {complete: !item.complete}));
        default:
            return state
    }
}


const checker = (store) => (next) => (action) => {

    if (action.type === ADD_TODO &&
        action.todo.name.toLowerCase().includes('bitcoin')) {
        return alert("Nope. That's a bad idea.");
    }

    if (action.type === ADD_GOAL &&
        action.goal.name.toLowerCase().includes('bitcoin')) {
        return alert("Nope. That's a bad idea.");
    }

    return next(action);
};


const logger = (store) => (next) => (action) => {

    console.group(action.type);
    console.log("The action : ", action);
    const result = next(action);
    console.log("The new state : ", store.getState());
    console.groupEnd();
    return result;

};

const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals,
}), Redux.applyMiddleware(checker, logger));

