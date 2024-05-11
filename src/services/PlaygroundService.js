import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/v1/playgrounds';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLnJ1IiwiaWF0IjoxNzE1NDMwMTI3LCJleHAiOjE3MTU0NDQ1Mjd9.yABO4IPRnrZTFXce5H8B1ZiR5n4z9hzooDsErIJZdZs'
const config = {
    headers: {
        Authorization: `Bearer `+ token
    }
}

export const listOfPlaygrounds = () => axios.get(BASE_URL + '/all', config)

export const createPlayground = (playground) =>
    axios.post(BASE_URL + '/create', playground, config)

export const getPlayground = (playgroundId) => axios.get(BASE_URL + `/` + playgroundId, config)

export const updatePlayground = (playgroundId, playground) =>
    axios.put(BASE_URL + '/' + playgroundId, playground, config)

export const deletePlayground = (playgroundId) =>
    axios.delete(BASE_URL + '/' + playgroundId, config)