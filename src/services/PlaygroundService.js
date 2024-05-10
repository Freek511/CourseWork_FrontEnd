import axios from "axios";
import playgroundComponent from "../components/PlaygroundComponent.jsx";

const BASE_URL = 'http://localhost:8080/api/v1/playgrounds';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLnJ1IiwiaWF0IjoxNzE1MzY4MTEzLCJleHAiOjE3MTUzODI1MTN9.tt0uwQ2C04wcCNFLI1Rgdp1kmidrq-0h3mY6qotuo6s'
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