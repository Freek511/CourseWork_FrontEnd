import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/v1/playgrounds';
const config = {
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLnJ1IiwiaWF0IjoxNzE1MzQzMzI4LCJleHAiOjE3MTUzNTc3Mjh9.RQF0ZIH37H4PrR2XoHj4qQi47wQJSlbUhv8Z5WSTifY`
    }
}

export const listOfPlaygrounds = () => axios.get(BASE_URL + '/all', config)
export const createPlayground = (playground) =>
    axios.post(BASE_URL + '/create', playground, config)