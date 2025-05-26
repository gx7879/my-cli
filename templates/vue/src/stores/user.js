import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const name = ref('')
  const email = ref(null)
  const accessToken = ref(null)

  const getAccessToken = computed(() => accessToken.value)

  return {
    isLogin,
    name,
    email,
    getAccessToken,
  }
})
