<script setup>
import { ref } from 'vue';

import { io } from 'socket.io-client';

const messages = ref([]);
const inputValue = ref('');

const socket = io.connect('localhost:3000', {
  path: '/socket.io/',
});

socket.on('chat message', msg => {
  messages.value.push(msg);
  window.scrollTo(0, document.body.scrollHeight);
});

function sendMessage(evt) {
  if (inputValue.value.trim()) {
    socket.emit('chat message', inputValue.value);
    inputValue.value = '';
  }
}
</script>

<template>
  <ul id="messages">
    <li v-for="message in messages">{{ message }}</li>
  </ul>
  <form @submit.prevent="sendMessage">
    <input v-model="inputValue" autocomplete="off" /><button>Send</button>
  </form>
</template>

<style scoped></style>
