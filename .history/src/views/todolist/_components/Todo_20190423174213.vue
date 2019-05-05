<template lang="pug">
  .todo-item
    .todo-item-left
      input.todoInput(type='checkbox', @click='completeTodo(todo)', :checked='todo.completed')
      .todo-item-label(v-if='!todo.editing', v-bind:class='{ completed : todo.completed }') {{ todo.title }}
    .remove-item
      label.auto_created Авто-создание
      input(type='checkbox', :disabled="todo.completed", @click='checkIt(todo)')
      i.fas.fa-times.remove(@click='removeItem(index)')
</template>

<script>
import todoApi from "../_api/todoApi.js"
import { mapActions, mapGetters } from "vuex"
import { setInterval } from 'timers';

export default {
  data() {
    return {
      simple: ''
    }
  },
  props: [
    'todo',
    'index'
  ],
   computed: {
    ...mapGetters({
      getTodos: 'urlForm/getTodos'
    }),
  },
  methods: {
    ...mapActions({
      updateTodo: 'urlForm/updateTodo',
      
    }),
    completeTodo(todo) {
      // Отправка при выборе фильтра "Выполнено"
      todoApi.editTodo(todo.id)
      .then(() => {
        console.log('Удачно')
      })
      .catch(() => {
        console.log('Ошибка при завершении записи')
      })
      this.updateTodo(todo)
    },
    checkIt(todo) {
      todo.check = !todo.check

      if(todo.check) {
        
        this.simple = setInterval(setTime(), 2000)

        setInterval(() => {
          todoApi.editTodo(todo.id)
            .then(() => {
              console.log('Удачно')
      })
            .catch(() => {
              console.log('Ошибка обновления записи');
              console.log(1)
      })
        }, 1000)
      } else if (!todo.check) {
        
      }
    },
    setTime(){
      alert(1)
    },
    removeItem(index) {
      // отправка удаленного id - todo
      todoApi.deleteTodo(index)
      .then(() => {
        console.log('Удачно');
      })
      .catch( error => {
        console.log(error)
      })
      this.getTodos.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus">
  .todo-input 
    width 100%
    border none
    margin-bottom 10px
    border-bottom 1px solid rgba(102, 102, 102, 0.192)
    font-size 18px
    transition 0.2s ease-in-out !important
    text-align center
    &:placeholder 
      color rgba(145, 145, 145, 0.795)
      opacity 1
    &:focus 
      outline none
    &:focus-webkit-input-placeholder 
      opacity 0
      transition 0.2s ease-in-out !important
      will-change transform, opacity
    &:-webkit-input-placeholder 
      transition 0.2s ease-in-out !important
      will-change transform, opacity
    &:-moz-placeholder 
      transition all 0.2s ease-in-out !important
      will-change opacity
      /* Firefox 19+ */
    &:-moz-placeholder
      transition all 0.2s ease-in-out !important
      will-change transform, opacity
      /* Firefox 18- */
    &:-ms-input-placeholder 
      transition all 0.2s ease-in-out !important
      will-change transform, opacity
  
  .todo-item 
    width 100%
    margin-bottom 10px
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid rgba(226, 226, 226, 0.767)  
   
  .todoInput 
    margin-left 20px
  
  .todo-item-label 
    margin-bottom 10px
  
  .todo-item-left 
    display flex
    align-items center
  
  .todo-item-label 
    padding 0px
    border 1px solid white
    margin-left 15px
  
  .todo-item-edit 
    width 50%
    border 1px solid rgba(102, 102, 102, 0.192)
    font-size 18px
    padding 10px 18px
    margin-bottom 20px
    transition 0.2s ease-in-out !important
    &:focus 
      outline none
    &:focus-webkit-input-placeholder 
      opacity 0
      transition 0.2s ease-in-out !important
      will-change transform, opacity
    &:-webkit-input-placeholder 
      transition 0.2s ease-in-out !important
      will-change transform, opacity
    &:-moz-placeholder 
      transition all 0.2s ease-in-out !important
      will-change transform, opacity
      /* Firefox 19+ */
    &:-moz-placeholder 
      transition all 0.2s ease-in-out !important
      will-change transform, opacity
      /* Firefox 18- */
    &:-ms-input-placeholder 
      transition all 0.2s ease-in-out !important
      will-change transform, opacity
  
  .completed 
    text-decoration line-through
    color #E1E1E1
    opacity .8
</style>