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

store.subscribe(() => {
    const {todos, goals} = store.getState();

    document.getElementById('todos').innerHTML = '';
    document.getElementById('goals').innerHTML = '';

    todos.forEach(addTodoToDOM);
    goals.forEach(addGoalToDOM);
});

// DOM Code
function addTodo() {
    const input = document.getElementById('todo');
    const todo = input.value;
    input.value = '';

    store.dispatch(addTodoAction({
            id: generateId(),
            name: todo,
            complete: false,
        })
    );
}

function addGoal() {
    const input = document.getElementById('goal');
    const goal = input.value;
    input.value = '';

    store.dispatch(addGoalAction({
            id: generateId(),
            name: goal,
            complete: false,
        })
    );
}

document.getElementById('todoBtn')
    .addEventListener('click', addTodo);

document.getElementById('goalBtn')
    .addEventListener('click', addGoal);

function createRemoveButton(onClick) {

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'X';
    removeBtn.addEventListener('click', onClick);
    return removeBtn;

}

function addTodoToDOM(todo) {

    const item = document.createElement('li');

    const text = document.createTextNode(todo.name);

    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeTodoAction(todo.id));
    });

    item.appendChild(text);
    item.appendChild(removeBtn);

    item.style.textDecoration = todo.complete ? 'line-through' : 'none';
    item.addEventListener('click', () => {
        store.dispatch(toggleTodoAction(todo.id));
    });

    document.getElementById('todos')
        .appendChild(item);

}

function addGoalToDOM(goal) {

    const item = document.createElement('li');

    const text = document.createTextNode(goal.name);

    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeGoalAction(goal.id));
    });


    item.appendChild(text);
    item.appendChild(removeBtn);

    item.style.textDecoration = goal.complete ? 'line-through' : 'none';
    item.addEventListener('click', () => {
        store.dispatch(toggleGoalAction(goal.id));
    });

    document.getElementById('goals')
        .appendChild(item);

}