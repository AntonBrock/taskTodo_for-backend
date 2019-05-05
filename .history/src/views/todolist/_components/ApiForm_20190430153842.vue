<template lang="pug">
  .form(v-cloak='')
    input.inputForUrl(v-model='url', 
                      type='text', 
                      @blur='clearIt()',
                      @keyup.enter='updateTodos_enter(url)' 
                      placeholder="Ссылка на Ваш Api в формате http://... нажми enter чтобы начать!"
                      :url = "url")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import todoApi from "../_api/todoApi.js";
import { setTimeout, setInterval, clearInterval } from 'timers';

export default {
  data() {
    return {
      url: "",
      filter: 'all',
      a: '',
      setTime:''
    }
  },
  created(){
  this.a = JSON.parse(localStorage.getItem('todos'))

  },
  computed: {
    ...mapGetters({
      getUrl: "urlForm/getUrl",
      getTodos: 'urlForm/getTodos',
      getStaticTodos: 'urlForm/getStaticTodos'
    })
  },
  methods: {
    ...mapActions({
      updateUrl: "urlForm/updateUrl",
      updateTodoList: "urlForm/updateTodoList"
    }),
    clearIt() {
  //   //получение всех todo при обновлении url ссылки
  //   // this.updateUrl(url)
    // if(this.url.length > 3 ) {
    //   this.updateTodoList([])
    // }
        
  //       // return this.updateTodos_enter(url)
  //       // todoApi.getTodos(this.filter)
  //       // .then(response => {
  //       //   this.updateTodoList(response.data)
  //       //   console.log(response);
  //       // })
  //       // .catch(error => {
  //       //   console.log(error)
  //       //   console.warn('Ошибка запроса при отправки всех TODO, скорее всего сервер не ответил')
  //       // });
  //   // console.warn('Был установлен ваш Url')
  //   } 
       
    // if(this.url.length <= 3 ) {
    //     console.warn('Введи ссылку на API и нажми')
    //     this.updateTodoList(this.getStaticTodos)
    //     this.id = 8
    //     clearInterval(this.setTime)
    // }
  },
    updateTodos_enter(url) {
    //получение всех todo при обновлении url ссылки(по enter)
    this.updateUrl(url) 
    if(this.url.length > 3 ){
        
      this.updateTodoList([])
      this.setTime = setInterval(() => {
        todoApi.getTodos(this.filter)
        .then(response => {
          this.updateTodoList(response.data)
          console.log(response);
        })
        .catch(error => {
          console.log(error)
          console.warn('Ошибка запроса при отправки всех TODO, скорее всего сервер не ответил')
        })
      }, 5000)
    console.warn('Был установлен ваш Url')
    } 
       
    if(this.url.length <= 3 ) {
        this.updateTodoList(this.getStaticTodos)
        this.id = 8
        clearInterval(this.setTime)
        console.warn('Сcылка должна быть от 4х символов и нажмите enter, чтобы начать!')
    }
  }
  }
};
</script>

<style lang="stylus">
.inputForUrl
  border-bottom 1px solid #666!important
  margin-bottom 20px
  text-align center
  border none
  width 100%
  height 50px
  font-size 20px
  &::placeholder
    color #666
    font-size 20px
    opacity 1
    transition: 0.2s ease-in-out !important;
		will-change: transform, opacity;

  &:focus::placeholder{
    opacity 0
    transition: 0.2s ease-in-out !important;
		will-change: transform, opacity;
  }
</style>