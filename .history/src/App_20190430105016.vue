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
    text-align center
    margin-left 25%
  .helpText
    width 69%
    color: #666
    font-size 16px
</style>
