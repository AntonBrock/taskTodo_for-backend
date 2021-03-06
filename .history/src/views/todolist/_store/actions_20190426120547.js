export function updateUrl ({ commit, state }, payload) {
    state.url = payload
    commit("UPDATE_URL");
}

export function updateTodo ({ commit }, payload) {
    payload.completed = !payload.completed
    commit("UPDATE_TODOS");
}

export function updateTodoList ({ commit, state }, payload) {
    state.todos = payload
    commit("UPDATE_TODOS");
}

export function filterTodoList ({ commit, state }) {
    state.todos = state.todos.filter(todo => !todo.completed)
    localStorage.setItem('todos')
    commit("UPDATE_TODOS");
}