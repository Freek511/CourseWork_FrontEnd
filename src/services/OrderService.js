import axios from "axios";


const BASE_URL = 'http://localhost:8080/api/v1/orders';

export const createOrder = (order, config) =>
    axios.post(`${BASE_URL}/create`, order, config);
export const getAllOrdersByUser = (config) =>
    axios.get(`${BASE_URL}/all`, config);
export const getAllOrdersForAdmin = (config) =>
    axios.get(`${BASE_URL}/admin/all`, config)
export const deleteOrder = (order_id, config) =>
    axios.delete(`${BASE_URL}/delete/${order_id}`, config);
export const getOrderById = (order_id, config) =>
    axios.get(`${BASE_URL}/${order_id}`, config)
export const updateOrder = (order_id, order, config) =>
    axios.put(`${BASE_URL}/${order_id}`, order, config);