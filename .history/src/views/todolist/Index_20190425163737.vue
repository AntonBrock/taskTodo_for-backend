<template lang="pug">
  .main-container(v-cloak)
    ApiForm
    div
      input.todo-input(type='text', placeholder='Что должно быть сделано?', v-model='firstTodo',  @keyup.enter='newTodo')
      button.btn(v-on:click='addNewTodo') Добавить В TODO

      Todo(v-for='(todo, index) in todosFiltered', :key='todo.id', :todo="todo" :index='index')

      .extra-container
        .extra-container_numInList {{ remaining }} TODO активно
        div
          button(v-bind:class="{ active: filter == 'all' }", v-on:click=" filter = 'all'") Все
          button(v-bind:class="{ active: filter == 'active' }", v-on:click=" filter = 'active'") Не Выполнено
          button(v-bind:class="{ active: filter == 'completed' }", v-on:click=" filter = 'completed'") Выполнено
        button(@click='filterTodoList') Очистить завершенные
</template>

<script>
import ApiForm from "./_components/ApiForm.vue"
import Todo from "./_components/Todo.vue"
import { mapActions, mapGetters } from "vuex"
import todoApi from "./_api/todoApi.js"

export default {
  data () {
    return {
      firstTodo: '',
      beforeEditCache: '',
      filter: 'all',
      error: false
    }
  },
  created(){
    localStorage.setItem('todos', JSON.stringify(this.getTodos))
  },
  mounted(){
    // Отправка при включении TODO + сразу отправка всех активных TODO
    todoApi.getTodos('all')
    .then(response => {
      this.todos = response.data
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  },
  computed: {
    ...mapGetters({
      getTodos: 'urlForm/getTodos'
    }),
    remaining() {
      return this.getTodos.filter(todo => !todo.completed).length
    },
    todosFiltered() {
      if (this.filter == 'all') {
        // Отправка при выборе фильтра "Все" (Активные)
        todoApi.getTodos('all')
        .then(done => {
          console.log(done)
        })
        .catch( error => {
          console.log(error)
        })
        console.log(this.getTodos);
          return this.getTodos
      } else if (this.filter == 'active') {
        console.log(this.getTodos);
          return this.getTodos.filter(todo => !todo.completed)
      } else if (this.filter == 'completed') {
        todoApi.getTodos('completed')
        .then(done => {
          console.log(done)
        })
        .catch( error => {
          console.log(error)
        }) 
        console.log(this.getTodos);
          return this.getTodos.filter(todo => todo.completed)
      }
    }
  },
  methods: {
    ...mapActions({
      filterTodoList: 'urlForm/filterTodoList'
    }),
    addNewTodo() {
      let data = {
        id: this.idForTodo,
        title: this.firstTodo,
        completed: false,
      }
      if(this.firstTodo.trim().length == 0) {
        return 
      }
      // отправка при добавлении нового TODO
      todoApi.postTodo(data)
      .then(() => {
        console.log('ok');
        this.getTodos.push(data)
        localStorage.setItem('todos', JSON.stringify(this.getTodos))
      })
      .catch(error => {
        console.log('Ошибка при запросе на Ваш сервер')
        this.getTodos.push(data)
        localStorage.setItem('todos', JSON.stringify(this.getTodos))
      })
      this.firstTodo = ''
      this.idForTodo++
    },
    newTodo() {
        let data = {
        id: this.idForTodo,
        title: this.firstTodo,
        completed: false,
      }
      if(this.firstTodo.trim().length == 0) {
        return 
      }
      // отправка при добавлении нового TODO
      todoApi.postTodo(data) // каждые 5 сек 
      .then(() => {
        console.log('ok');
        this.getTodos.push(data)
      })
      .catch(error => {
        console.log('Сервер не ответил')
        this.getTodos.push(data)
      })

      this.firstTodo = ''
      this.idForTodo++
    }
  },
  components: {
    ApiForm,
    Todo
  }
}

</script>

<style lang="stylus">
  [v-cloak]
    display none

  .main-container 
    border 1px solid #DDDDDD
    width 50%
    margin-left 25%
    box-shadow 0 10px 0 -5px #eee,
               0 10px 1px -4px rgba(0,0,0,0.15),
               0 20px 0 -10px rgb(238, 238, 238),
               0 20px 1px -9px rgba(0,0,0,0.15),
               0 14px 28px rgba(75, 75, 75, 0.30)
  
  .extra-container 
    display flex
    align-items center
    justify-content space-around
    font-size 12px
    padding-top 5px
    margin-bottom 14px
  
  .extra-container_numInList 
    margin-right 30px
    font-size 12px
    
  button 
    font-size 12px
    background-color white
    appearance none
    border none
    outline none
    color rgb(95, 95, 95)
    &:hover 
      background rgba(211, 211, 211, 0.363)
    &:focus 
      outline none

  .active 
    background #fff
    border 1px solid #E1E1E1
  
  .remove-item 
    margin-right 20px
  
  .remove
    margin-left: 10px
    opacity .3
    transition all 0.2s ease-in-out !important
    &:hover 
      opacity .9
      color#E11010
      transition all 0.2s ease-in-out !important

  .auto_created 
    font-size 1rem
    color rgba(102, 102, 102, 0.767)
    
  .btn 
    border-radius 3px
    margin-bottom 25px
    width 80%
    margin-left 10%
    height 40px
    color #fff
    background-color #26a69a
    text-align center
    letter-spacing .5px
      -webkit-transition background-color .2s ease-out
    transition background-color .2s ease-out
    cursor pointer
    box-shadow 0 2px 2px 0 rgba(0,0,0,.14),
               0 3px 1px -2px rgba(0,0,0,.12),
               0 1px 5px 0 rgba(0,0,0,.2)
    &:hover
      background-color #46b6abe3!important
</style>