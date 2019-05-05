<template lang="pug">
  .todo-item
    .todo-item-left
      input.todoInput(type='checkbox',  @click='completeTodo(todo)', :checked='todo.completed')
      div.todo-item-label(v-if='!todo.editing',  v-on:dblclick="changeTodo(todo)" v-bind:class='{ completed : todo.completed }') {{ todo.title }}
      input.todo-item-edit(v-else type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)")
    .remove-item
      label.auto_created Авто-создание
      input(type='checkbox', :disabled="todo.completed", :checked="todo.autocreate" @click='checkIt(todo)') 
      i.fas.fa-times.remove(@click='removeItem(index)')
</template>

<script>
import todoApi from "../_api/todoApi.js";
import { mapActions, mapGetters } from "vuex";
import { setInterval, clearInterval } from "timers";

export default {
  data() {
    return {
      beforeEditCache: ''
    };
  },
  props: ["todo", "index", "url"],
  created() {
    localStorage.setItem("todos", JSON.stringify(this.getTodos));
  },
  computed: {
    ...mapGetters({
      getTodos: "urlForm/getTodos",
      getUrl: "urlForm/getUrl"
    })
  },
  methods: {
    ...mapActions({
      updateTodo: "urlForm/updateTodo",
      changeTodo: "urlForm/changeTodo"
    }),
    completeTodo(todo) {
      // Отправка при выборе фильтра "Выполнено"
      if (this.getUrl.length > 3) {
        todoApi
          .editTodo(todo.id)
          .then(() => {
            console.info("Удачно");
          })
          .catch(() => {
            console.warn("Ошибка запроса при зачеркивание TODO, скорее всего сервер не ответил!"); 
          });
      }

      this.updateTodo(todo);
      localStorage.setItem("todos", JSON.stringify(this.getTodos));
    },
    checkIt(todo) {
      todo.autocreate = !todo.autocreate;

      if (this.getUrl.length > 3) {
        todoApi
          .editTodo(this.todo.id)
          .then(() => {
            console.info("Удачно");
          })
          .catch(() => {
            console.log(this.getTodos);
            console.warn("Ошибка запроса при выборе 'Авто-создание', скорее всего сервер не ответил");
          });
      }
      localStorage.setItem("todos", JSON.stringify(this.getTodos));
    },
    removeItem(index) {
      // отправка удаленного id - todo
      if (this.getUrl.length > 3) {
        todoApi
          .deleteTodo(index)
          .then(() => {
            console.info("Удачно");
          })
          .catch(error => {
            console.warn(error);
            console.warn('Ошибка запроса при удалении TODO, скорее всего сервер не ответил!')
          });
      }
      this.getTodos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(this.getTodos));
    },

    // тут редактирование TODO + сохранение в TODO
    changeTodo(todo){
      if(this.todo.completed){
        return
      }
        
      if (this.getUrl.length > 3) {
        //тут запрос, на сколько верен не знаю
      todoApi
        .editTodo(this.todo.id)
        .then(() => {
          console.info("Удачно");
        })
        .catch(() => {
          console.log(this.getTodos);
          console.warn("Ошибка запроса при изменении 'Названия TODO' , скорее всего сервер не ответил");
        });
      }
      
      this.beforeEditCache = todo.title
      todo.editing = true;
      localStorage.setItem("todos", JSON.stringify(this.getTodos));

    },
    doneEdit(todo) {
      if(todo.title.trim() == '') {
        todo.title = this.beforeEditCache
       this.changeTodo(todo);
      }
      todo.editing = false;
      localStorage.setItem("todos", JSON.stringify(this.getTodos));
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache
      todo.editing = false;
      this.changeTodo(todo);
    },
  }
};
</script>

<style lang="stylus">
.todo-input {
  width: 100%;
  border: none;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(102, 102, 102, 0.192);
  font-size: 18px;
  transition: 0.2s ease-in-out !important;
  text-align: center;
  outline: none;

  &:placeholder {
    color: rgba(145, 145, 145, 0.795);
    opacity: 1;
    transition: 0.2s ease-in-out !important;
  }

  will-change: transform, opacity;

  &:focus::placeholder {
    opacity: 0;
    transition: 0.2s ease-in-out !important;
  }

  will-change: transform, opacity;

  &:focus-webkit-input-placeholder {
    opacity: 0;
    transition: 0.2s ease-in-out !important;
    will-change: transform, opacity;
  }

  &:-webkit-input-placeholder {
    transition: 0.2s ease-in-out !important;
    will-change: transform, opacity;
  }

  &:-moz-placeholder {
    transition: all 0.2s ease-in-out !important;
    will-change: opacity;
    /* Firefox 19+ */
  }

  &:-moz-placeholder {
    transition: all 0.2s ease-in-out !important;
    will-change: transform, opacity;
    /* Firefox 18- */
  }

  &:-ms-input-placeholder {
    transition: all 0.2s ease-in-out !important;
    will-change: transform, opacity;
  }
}

.todo-item {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(226, 226, 226, 0.767);
}

.todoInput {
  margin-left: 20px;
}

.todo-item-label {
  margin-bottom: 10px;
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 0px;
  border: 1px solid white;
  margin-left: 15px;
}

.todo-item-edit {
  width: 50%;
  border: 1px solid rgba(102, 102, 102, 0.192);
  font-size: 18px;
  padding: 10px 18px;
  margin-bottom: 20px;
  transition: 0.2s ease-in-out !important;

  &:focus {
    outline: none;
  }

  &:focus-webkit-input-placeholder {
    opacity: 0;
    transition: 0.2s ease-in-out !important;
    will-change: transform, opacity;
  }

  &:-webkit-input-placeholder {
    transition: 0.2s ease-in-out !important;
    will-change: transform, opacity;
  }

  &:-moz-placeholder {
    transition: all 0.2s ease-in-out !important;
    will-change: transform, opacity;
    /* Firefox 19+ */
  }

  &:-moz-placeholder {
    transition: all 0.2s ease-in-out !important;
    will-change: transform, opacity;
    /* Firefox 18- */
  }

  &:-ms-input-placeholder {
    transition: all 0.2s ease-in-out !important;
    will-change: transform, opacity;
  }
}

.completed {
  text-decoration: line-through;
  color: #E1E1E1;
  opacity: 0.8;
}
</style>