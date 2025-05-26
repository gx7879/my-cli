import Axios from '@/util/request'

const axios = new Axios()

export function getTodoList() {
  return axios.get('/api/todos')
}
