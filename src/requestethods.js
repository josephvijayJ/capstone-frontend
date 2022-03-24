import axios from 'axios';

const BASE_URL = 'https://capstone-backendserver.herokuapp.com/api';
let token = localStorage.getItem('token');

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {
    token: token,
  },
});
