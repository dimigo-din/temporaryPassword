import axios from 'axios';
// import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://api.dimigo.in/',
  timeout: 5000
});

export default api;