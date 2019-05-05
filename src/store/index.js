import Vue from 'vue'
import Vuex from 'vuex'
import urlForm from '../views/todolist/_store'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        urlForm
    }
})
