<template>
  <div
      v-if="isOpen"
      class="backdrop"
      @click="close"
  >
    <div class="modal" @click.stop>
      <img
          class="close-button"
          src="../assets/close.svg"
          alt="Close button"
          @click="close"
      >
      <img class="modal-avatar" :src="user.avatar" alt="Avatar">
      <div class="modal-info">
        <table class="modal-table">
          <tr>
            <td>Имя</td>
            <td v-if="!isEdit">{{ firstName }}</td>
            <input
                v-else
                type="text"
                v-model="firstName"
            >
          </tr>
          <tr>
            <td>Фамилия</td>
            <td v-if="!isEdit">{{ lastName }}</td>
            <input
                v-else
                type="text"
                v-model="lastName"
            >
          </tr>
          <tr>
            <td>Email</td>
            <td v-if="!isEdit">{{ email }}</td>
            <input
                v-else
                type="text"
                v-model="email"
            >
          </tr>
        </table>
        <button
            class="modal-button left"
            @click="isEdit = !isEdit"
        >
          {{ isEdit ? "Сохранить" : "Редактировать" }}
        </button>
        <button class="modal-button right red" @click="deleteModalUser">Удалить</button>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {User} from "@/types";
import {MutationTypes} from "@/store/mutation-types";
import {useStore} from "@/store";

export default defineComponent({
  name: "Modal",
  data() {
    return {
      isOpen: false,
      isEdit: false,
      firstName: this.user ? this.user.first_name : "",
      lastName: this.user ? this.user.last_name : "",
      email: this.user ? this.user.email : ""
    };
  },
  props: {
    user: Object as () => User
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      if (this.user) {
        const newUser: User = {
          id: this.user.id,
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          avatar: this.user.avatar
        }
        useStore().commit(MutationTypes.EDIT_USER, newUser)
      }
      this.isOpen = false;
    },
    deleteModalUser() {
      if (this.user){
        useStore().commit(MutationTypes.DELETE_USER, this.user.id)
      }
    }
  },
})
</script>

<style scoped>
.modal {
  width: 500px;
  top: 50px;
  padding: 40px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 101;
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.modal-avatar {
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  flex-shrink: 0;
}

.modal-info {
  margin-left: 40px;
  background-color: white;
  flex-shrink: 1;
  width: 100%;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
}

.modal-table {
  width: 100%;
}

.modal-table td {
  text-align: left;
  padding-bottom: 10px;
}
.modal-table input {
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
}
.modal-button{
  margin-top: 10px;
  background-color: rgba(0,0,0,0.1);
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-family: inherit;
  font-size: inherit;
}
.modal-button:active {
  opacity: 0.7;
}
.red{
  background-color: #ff8887;
}
.left{
  float: left;
}
.right{
  float: right;
}
</style>