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
    localStorage.setItem('todos', JSON.stringify(this.getTodos))
    state.todos = state.todos.filter(todo => !todo.completed)
    commit("UPDATE_TODOS");
}