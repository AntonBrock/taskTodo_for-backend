<template lang="pug">
  #app
    Todolist
    div
      p Hello!
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
