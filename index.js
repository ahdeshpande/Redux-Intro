function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const TOGGLE_GOAL = 'TOGGLE_GOAL';
const RECEIVE_DATA = 'RECEIVE_DATA';

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

function receiveDataAction(todos, goals) {
    return {
        type: RECEIVE_DATA,
        todos,
        goals,
    }
}

function handleDeleteTodo(item) {
    return (dispatch) => {
        dispatch(removeTodoAction(item.id));
        API.deleteTodo(item.id)
            .catch(() => {
                dispatch(addTodoAction(item));
                alert("There was some problem. Try again.")
            });
    }
}

function handleAddGoal(name, cb) {
    return (dispatch) => {
        return API.saveGoal(name)
            .then(goal => {
                dispatch(addGoalAction(goal));
                cb();
            })
            .catch(() => {
                alert("There was some problem. Try again.")
            });
    }
}

function handleDeleteGoal(item) {
    return (dispatch) => {
        dispatch(removeGoalAction(item.id));
        API.deleteGoal(item.id)
            .catch(() => {
                dispatch(addGoalAction(item));
                alert("There was some problem. Try again.")
            });
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
        case RECEIVE_DATA:
            return action.todos;
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
        case RECEIVE_DATA:
            return action.goals;
        default:
            return state
    }
}


function loading(state = true, action) {
    switch (action.type) {
        case RECEIVE_DATA:
            return false;
        default:
            return state;
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
    loading,
}), Redux.applyMiddleware(ReduxThunk.default, checker, logger));

