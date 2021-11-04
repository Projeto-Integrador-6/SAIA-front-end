import axios from 'axios';

const apiExternal = axios.create({
  baseURL: "http://localhost:3001"
})

export default apiExternal;