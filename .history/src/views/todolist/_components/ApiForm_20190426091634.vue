<template lang="pug">
  .form(v-cloak='')
    input.inputForUrl(v-model='url', 
                      type='text', 
                      @blur='updateTodos(url)', 
                      placeholder="Ссылка на Ваш Api в формате http://...")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import todoApi from "../_api/todoApi.js";

export default {
  data() {
    return {
      url: "",
      filter: 'all',
      a: ''
    }
  },
  created(){
    this.a = JSON.parse(localStorage.getItem('todos'))
  },
  computed: {
    ...mapGetters({
      getUrl: "urlForm/getUrl",
      getTodos: 'urlForm/getTodos'
    })
  },
  methods: {
    ...mapActions({
      updateUrl: "urlForm/updateUrl",
      updateTodoList: "urlForm/updateTodoList"
    }),
    updateTodos(url) {
       //получение всех todo при обновлении url ссылки
      this.updateUrl(url);

      if(this.url >= 2){ 
        this.updateTodoList([])
      } else {
        this.updateTodoList(this.a)
        alert(this.a)
      // let a =  JSON.parse(localStorage.getItem('todos')) //тут вызов из LS
      // this.updateTodoList([this.a]) // тут херня -- хз
      }

      todoApi.getTodos(this.filter)
      .then(response => {
        this.updateTodoList(response.data)
          console.log(response);
      })
      .catch(error => {
          console.log(error)
      });
      console.log('Был установлен ваш Url')
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