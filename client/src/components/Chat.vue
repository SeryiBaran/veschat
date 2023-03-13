<script setup lang="ts">
import { ref, nextTick, computed } from 'vue';
import { io } from 'socket.io-client';
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

type Message = {
  id: number;
  content: string;
};

const messages = ref<Message[]>([]);
const inputValue = ref('');
const isValid = computed(() => !!inputValue.value.trim());
const messagesListRef = ref<HTMLElement | null>(null);

const isLoading = ref(true);

const scrollToBottom = async () => {
  await nextTick();
  messagesListRef.value?.scrollTo(0, messagesListRef.value?.scrollHeight);
};

fetch(import.meta.env.VITE_SERVER_ADDR + '/messages')
  .then(res => res.json())
  .then(data => {
    if (data.messages) messages.value = data.messages;
  })
  .then(() => {
    isLoading.value = false;
    scrollToBottom();
  });

const socket = io(import.meta.env.VITE_SERVER_ADDR);

socket.on('new chat message', async msg => {
  messages.value.push(msg);
  await scrollToBottom();
});

function sendMessage() {
  const trimmedValue = inputValue.value.trim();
  socket.emit('create chat message', trimmedValue);
  inputValue.value = '';
}
</script>

<template>
  <Card>
    <template #content>
      <div class="card">
        <ScrollPanel style="height100px">
          <ul class="list" ref="messagesListRef">
            <TransitionGroup name="list" v-if="!isLoading">
              <li class="message" v-for="message in messages" :key="message.id">
                <div class="chat-bubble">
                  {{ message.content }}
                </div>
              </li>
            </TransitionGroup>
          </ul>
        </ScrollPanel>
        <form @submit.prevent="sendMessage" class="p-inputgroup">
          <InputText v-model="inputValue" autocomplete="off" />
          <Button type="submit" :disabled="!isValid">Send</Button>
        </form>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.card {
  max-height: 28rem;
  display: flex;
  flex-direction: column;
  word-break: break-all;
}

.list {
  overflow-y: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

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
