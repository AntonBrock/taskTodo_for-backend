<template lang="pug">
  #app
    Todolist
    .helpContainer
      p.helpText Чтобы начать работу, введи ссылку в поле "Ваш API..", нажми Enter или убери фокус и пойдут запросы! <br> Чтобы обнулить все действия, просто оставь поле "Ваш API.." пустым и нажми Enter или убери фокус! <br> Для удобства советуем пользоваться инструментом DevTools, удачи!
</template>

<script>
import Todolist from './views/todolist/Index.vue'

export default {
  name: 'app',
  components: {
    Todolist
  }
}
</script>

<style lang="stylus">
  .helpContainer
    margin-top 40px
    text-align center
    margin-left 22%
  .helpText
    width 75%
    color: #474747
    font-size 16px
    line-height 1.5
</style>
