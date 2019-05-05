<template lang="pug">
  #app
    Todolist
    .helpContainer
      p.helpText Чтобы начать работу, введи ссылку в поле "Ваш API..", нажми Enter и пойдут запросы! <br> Чтобы обнулить все действия, просто оставь поле "Ваш API.." пустым и нажми Enter! Для удобства советуем пользоваться инструментом DevTools, удачи! <br> Если у Вас после обновления страницы не отображаются TODO, просто нажми Enter в поле ввода вашего API
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
    line-height 1.3
</style>
