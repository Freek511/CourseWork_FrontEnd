import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/auth'

export const loginUser = (user) => axios.post(`${BASE_URL}/login`, user)
export const registerUser = (user) => axios.post(`${BASE_URL}/register`, user)