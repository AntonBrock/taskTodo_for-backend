<template lang="pug">
  #app
    Todolist
    .helpWorld
      p.helpText Эта TODO работает в двух режимах, дэмо-режим и для работы.
      br 
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
