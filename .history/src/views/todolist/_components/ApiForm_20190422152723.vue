<template lang="pug">
  .form(v-cloak='')
    input.inputForUrl(v-model='url', 
                      type='text', 
                      @keyup.enter='updateTodos(url)', 
                      placeholder="Ссылка на твой Api в формате http://... не забудь нажать 'Enter'")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import todoApi from "../_api/todoApi.js";

export default {
  data() {
    return {
      url: "",
      filter: 'all'
    }
  },
  computed: {
    ...mapGetters({
      getUrl: "urlForm/getUrl"
    })
  },
  methods: {
    ...mapActions({
      updateUrl: "urlForm/updateUrl",
      updateTodoList: "urlForm/updateTodoList" //here
    }),
    updateTodos(url) {
      this.updateUrl(url);
      todoApi.getTodos(this.filter)   // .getTodos('all") =  it's NOT OKAY!
      .then(response => {
        this.updateTodoList(response.data)
        // eslint-disable-next-line
        console.log(response);
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log(error)
      });
    }
  }
};
</script>

<style lang="stylus">
.inputForUrl
  border none
  width 100%
  height 50px
  padding-left 15px
</style>