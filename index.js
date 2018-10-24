function createStore(reducer) {
    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    return {
        getState,
        subscribe,
        dispatch,
    }
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
            return state.filter(item => item !== action.id);
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
            return state.filter(item => item !== action.id);
        case TOGGLE_GOAL:
            return state.map(item => item.id !== action.id ? item :
                Object.assign({}, item, {complete: !item.complete}));
        default:
            return state
    }
}


function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}


const store = createStore(app);

store.subscribe(() => {
    console.log('The new state is: ', store.getState())
});

store.dispatch(addTodoAction({
    id: 0,
    name: 'Walk the dog',
    complete: false,
}));

store.dispatch(addTodoAction({
    id: 1,
    name: 'Wash the car',
    complete: false,
}));

store.dispatch(addTodoAction({
    id: 2,
    name: 'Go to the gym',
    complete: true,
}));

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux'
}));

store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 20 pounds'
}));

store.dispatch(removeGoalAction(0));