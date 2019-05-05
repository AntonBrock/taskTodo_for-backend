<template lang="pug">
  #app
    Todolist
    .helpWorld
      p.helpText Чтобы начать работу, введи ссылку в поле "Ваш API..", нажми Enter или убери фокус и пойдут запросы! <br> Чтобы обнулить все действия, просто оставь поле "Ваш API.." пустым и нажми enter!
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
</style>
