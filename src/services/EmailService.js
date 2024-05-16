import axios from "axios";


const BASE_URL = 'http://localhost:8080/api/v1/email/';

export const sendEmail = (id) =>
    axios.get(BASE_URL+id);