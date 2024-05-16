import axios from "axios";


const BASE_URL = 'https://coursework-e95v.onrender.com/api/v1/email/';

export const sendEmail = (id) =>
    axios.get(BASE_URL+id);