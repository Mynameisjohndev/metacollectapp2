import axios from 'axios';

export const META_COLLECT_API = axios.create({
  // baseURL: 'http://localhost:3335',
  baseURL: 'https://api.datamilk.com.br',
});
