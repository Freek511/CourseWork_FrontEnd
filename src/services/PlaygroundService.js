import axios from "axios";


const BASE_URL = 'https://coursework-e95v.onrender.com/api/v1/playgrounds';


export const listOfPlaygrounds = (config) => axios.get(BASE_URL + '/all', config)

export const createPlayground = (playground, config) =>
    axios.post(BASE_URL + '/create', playground, config)

export const getPlayground = (playgroundId, config) =>
    axios.get(BASE_URL + `/` + playgroundId, config)

export const updatePlayground = (playgroundId, playground, config) =>
    axios.put(BASE_URL + '/' + playgroundId, playground, config)

export const deletePlayground = (playgroundId, config) =>
    axios.delete(BASE_URL + '/' + playgroundId, config)