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
    class="card max-h-[28rem] max-w-[20rem] grow w-full bg-base-300 shadow-xl flex flex-col justify-between break-words p-4 gap-2 max-sm:shadow-none max-sm:rounded-none max-sm:max-h-full max-sm:max-w-full"
  >
    <ul
      class="overflow-y-auto h-full flex flex-col gap-1 scrollbar"
      ref="messagesListRef"
    >
      <TransitionGroup name="list">
        <li
          class="message chat chat-start"
          v-for="message in messages"
          :key="message"
        >
          <div class="chat-bubble">
            {{ message }}
          </div>
        </li>
      </TransitionGroup>
    </ul>
    <form @submit.prevent="sendMessage" class="input-group max-sm:input-group-vertical">
      <input
        class="w-full input input-bordered sm:input-sm"
        v-model="inputValue"
        autocomplete="off"
      />
      <button class="btn sm:btn-sm btn-primary grow" :disabled="!isValid">Send</button>
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
  transform: translateX(-30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
