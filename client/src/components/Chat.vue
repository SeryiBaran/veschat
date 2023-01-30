<script setup lang="ts">
import { ref, nextTick, computed } from 'vue';

import { io } from 'socket.io-client';

const messages = ref<string[]>([]);
const inputValue = ref('');
const isValid = computed(() => !!inputValue.value.trim());
const messagesListRef = ref<HTMLElement | null>(null);

const socket = io(import.meta.env.VITE_SERVER_ADDR);

socket.on('chat message', async (msg: string) => {
  messages.value.push(msg);
  await nextTick();
  messagesListRef.value?.scrollTo(0, messagesListRef.value?.scrollHeight);
});

function sendMessage() {
  const trimmedValue = inputValue.value.trim();
  socket.emit('chat message', trimmedValue);
  inputValue.value = '';
}
</script>

<template>
  <div
    class="card h-96 bg-base-300 shadow-xl max-h-screen flex flex-col justify-between break-words p-4 gap-2"
  >
    <ul
      class="overflow-y-auto h-full flex flex-col gap-1 scrollbar"
      ref="messagesListRef"
    >
      <TransitionGroup name="list">
        <li
          class="message bg-base-100 rounded px-3 py-1"
          v-for="message in messages"
          :key="message"
        >
          {{ message }}
        </li>
      </TransitionGroup>
    </ul>
    <form @submit.prevent="sendMessage" class="flex gap-2">
      <input
        class="input input-bordered input-sm"
        v-model="inputValue"
        autocomplete="off"
      />
      <button class="btn btn-sm btn-primary" :disabled="!isValid">Send</button>
    </form>
  </div>
</template>

<style scoped>
.message {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
