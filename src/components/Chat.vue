<script setup>
import { ref } from 'vue';

import { io } from 'socket.io-client';

const messages = ref([]);
const inputValue = ref('');
const messagesListRef = ref(null);

const socket = io.connect(import.meta.env.DEV ? ':3000' : '');

socket.on('chat message', msg => {
  messages.value.push(msg);
});

function sendMessage(evt) {
  if (inputValue.value.trim()) {
    socket.emit('chat message', inputValue.value);
    inputValue.value = '';
  }
}
</script>

<template>
  <div
    class="max-w-[280px] h-96 max-h-screen flex flex-col justify-between break-words rounded border border-gray-500 p-2 bg-gray-700 gap-1"
  >
    <ul
      class="overflow-y-auto h-full flex flex-col gap-1 scrollbar"
      ref="messagesListRef"
    >
      <li class="bg-gray-600 rounded px-3 py-1" v-for="message in messages">
        {{ message }}
      </li>
    </ul>
    <form @submit.prevent="sendMessage" class="flex gap-1">
      <input
        class="bg-gray-800 px-3 py-1 grow w-full rounded"
        v-model="inputValue"
        autocomplete="off"
      />
      <button
        class="rounded-full bg-sky-600 hover:bg-sky-500 active:bg-sky-700 px-3 py-1 text-sm"
      >
        Send
      </button>
    </form>
  </div>
</template>

<style scoped></style>
