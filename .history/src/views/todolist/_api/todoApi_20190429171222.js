// import Api from '@/api/Api'
import axios from 'axios'
import state from '../_store/state'

const todoApi = {
  getTodos (filter) {
    return axios.get(`${state.url}/todos`, {
      // возвращает отфильтрованный или неотфильтрованный список
      type: filter
    })
  },
  postTodo (title, completed, autocreate) {
    return axios.post(`${state.url}/todos`, {
      title: title,
      completed: completed,
      autocreate: autocreate
    })
  },
  editTodo (id) {
    return axios.patch(`${state.url}/todos/${id}`)
  },
  deleteTodo (id) {
    return axios.delete(`${state.url}/todos/${id}`)
  }
}
export default todoApi