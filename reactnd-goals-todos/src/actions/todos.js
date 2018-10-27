import API from "goals-todos-api";

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

function addTodo(todo) {
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

export function handleAddTodo(name, cb) {
    return (dispatch) => {
        return API.saveTodo(name)
            .then(todo => {
                dispatch(addTodo(todo));
                cb();
            })
            .catch(() => {
                alert("There was some problem. Try again.")
            });

    }
}

export function handleDeleteTodo(item) {
    return (dispatch) => {
        dispatch(removeTodoAction(item.id));
        API.deleteTodo(item.id)
            .catch(() => {
                dispatch(addTodo(item));
                alert("There was some problem. Try again.")
            });
    }
}

export function handleToggleTodo(item) {
    return (dispatch) => {
        dispatch(toggleTodoAction(item.id));
        API.saveTodoToggle(item.id)
            .catch(() => {
                dispatch(toggleTodoAction(item.id));
                alert("There was some problem. Try again.")
            });
    }
}