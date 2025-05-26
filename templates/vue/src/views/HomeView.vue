<script setup>
import { onMounted, ref } from 'vue';
import { getTodoList } from '@/api/todo';

const todoList = ref([]);

/**
 * 取得TodoList資料
 */
async function getTodoListData() {
  const data = await getTodoList();

  todoList.value = data;
}

onMounted(() => {
  getTodoListData();
});

</script>

<template>
  <div class="text-center">
    <h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
      Welcome to Your Vue 3 Application
    </h2>
    <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
      This is a starter template built with Vue 3, Vite, and Tailwind CSS.
      Get started by editing <code class="bg-gray-200 px-2 py-1 rounded">src/components/Home.vue</code>
    </p>
    <div class="mt-8 flex justify-center space-x-4">
      <a href="https://vuejs.org/guide/introduction.html" target="_blank"
        class="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
        Learn Vue 3
      </a>
      <a href="https://vitejs.dev/guide/" target="_blank"
        class="inline-block bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition">
        Explore Vite
      </a>
    </div>

    <!-- Features Section -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold text-gray-900">Fast Development</h3>
        <p class="mt-2 text-gray-600">
          Vite's hot module replacement makes development lightning fast.
        </p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold text-gray-900">Responsive Design</h3>
        <p class="mt-2 text-gray-600">
          Built with Tailwind CSS for easy, responsive layouts.
        </p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold text-gray-900">Modern Framework</h3>
        <p class="mt-2 text-gray-600">
          Powered by Vue 3's Composition API for flexible development.
        </p>
      </div>
    </div>

    <div class="grid text-left mt-10">
      <h2 class="mb-2 text-lg font-semibold text-gray-900">TODO LIST:</h2>
      <ul class="space-y-1 text-gray-500 list-disc list-inside">
        <li v-for="todo in todoList" :key="todo.id">
          {{ todo.title }}
        </li>
      </ul>
    </div>

  </div>
</template>
