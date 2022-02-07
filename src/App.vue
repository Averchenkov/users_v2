<template>
  <div v-if="isLoading" class="container">
    <ul v-if="getUsers.length" class="list">
      <li
          class="li"
          v-for="user in getUsers"
          :key="user"
      >
        <Card :user="user"/>
      </li>
    </ul>
    <h1 v-else>Пользователей нет</h1>
    <button class="update-button" @click="update">Обновить</button>
  </div>
  <div v-else class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapGetters} from 'vuex'
import Card from "@/components/Card.vue";
import {ActionTypes} from "@/store/action-types";
import {useStore} from "@/store";

const store = useStore()

export default defineComponent({
  name: 'App',
  components: {
    Card
  },
  computed: mapGetters(["getUsers", "isLoading"]),
  methods: {
    async update() {
      await useStore().dispatch(ActionTypes.UPDATE_USERS)
    }
  },
  async mounted() {
    await useStore().dispatch(ActionTypes.FETCH_USERS)
  }
});
</script>

<style>
.container {
  margin: auto;
  width: 70%;
  border-radius: 20px;
  background-color: #b5bfe4;
}

.list {
  margin: 20px;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.li {
  margin: 20px;
  align-self: center;
  list-style-type: none;
}
.update-button {
  background-color: rgb(255 236 175);
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  font-family: inherit;
  font-size: inherit;
}
.update-button:active {
  opacity: 0.7;
}


.loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader div {
  animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.loader div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #b5bfe4;
  margin: -4px 0 0 -4px;
}
.loader div:nth-child(1) {
  animation-delay: -0.036s;
}
.loader div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.loader div:nth-child(2) {
  animation-delay: -0.072s;
}
.loader div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.loader div:nth-child(3) {
  animation-delay: -0.108s;
}
.loader div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.loader div:nth-child(4) {
  animation-delay: -0.144s;
}
.loader div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.loader div:nth-child(5) {
  animation-delay: -0.18s;
}
.loader div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.loader div:nth-child(6) {
  animation-delay: -0.216s;
}
.loader div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.loader div:nth-child(7) {
  animation-delay: -0.252s;
}
.loader div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.loader div:nth-child(8) {
  animation-delay: -0.288s;
}
.loader div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
