import axios from "axios";

const BASE_URL = "http://localhost:8080/products";

export const getProducts = () => axios.get(BASE_URL);
export const addProduct = (product) => axios.post(BASE_URL, product);