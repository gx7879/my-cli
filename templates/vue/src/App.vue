<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <!-- <img src="/vite.svg" alt="Logo" class="h-8 w-8 mr-3"> -->
            <img alt="Vue logo" src="@/assets/logo.svg" class="h-8 w-8 mr-3" />
            <h1 class="text-2xl font-bold text-gray-900">Vue 3 App</h1>
          </div>
          <nav class="space-x-4">
            <router-link to="/" class="text-gray-600 hover:text-gray-900">Home</router-link>
            <router-link to="/about" class="text-gray-600 hover:text-gray-900">About</router-link>
            <!-- <router-link to="/contact" class="text-gray-600 hover:text-gray-900">Contact</router-link> -->
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped></style>
