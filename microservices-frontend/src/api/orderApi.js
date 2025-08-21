import axios from "axios";

const BASE_URL = "http://localhost:8080/orders";

export const getOrders = () => axios.get(BASE_URL);
export const placeOrder = (order) => axios.post(BASE_URL, order);