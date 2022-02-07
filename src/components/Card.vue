<template>
  <div class="card" @click="openModal">
    <Modal ref="modal" :user="user"/>
    <img :src="user.avatar" alt="Avatar">
    <div class="card-info">
      <p>{{ user.first_name }} {{ user.last_name }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import Modal from "./Modal";

export default defineComponent({
  name: "Card",
  components: {Modal},
  props: {
    user: Object
  },
  methods: {
    openModal() {
      this.$refs.modal.open()
    },
  }
})
</script>

<style scoped>
.card {
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 200px;
  border-radius: 20px;
  overflow: hidden;
}
.card img {
  width: 100%;
}
.card-info {
  padding: 20px 10px;
}
.card-info p {
  margin: 0;
}
</style>