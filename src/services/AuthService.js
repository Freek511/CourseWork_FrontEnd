import axios from 'axios';

const BASE_URL = 'https://coursework-e95v.onrender.com/api/v1/auth'

export const loginUser = (user) => axios.post(`${BASE_URL}/login`, user)
export const registerUser = (user) => axios.post(`${BASE_URL}/register`, user)