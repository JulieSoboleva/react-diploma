import axios from "axios";
import { OrderModel } from "../models";

const connect = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getTopSalesApi = () => {
    return connect.get("/top-sales").then((response) => response.data);
};

export const getCategoriesApi = () => {
    return connect.get("/categories").then((response) => response.data);
};

interface ItemCategory {
    id?: number,
    offset?: number,
    q?: string,
}

export const getItemCategoryApi = ({ id: categoryId, offset = 0, q }: ItemCategory = {}) => {
    return connect
        .get("/items", { params: { categoryId, offset, q } })
        .then((response) => response.data);
};

export const getItemDetailsApi = (id: string | number) => {
    return connect.get(`/items/${id}`).then((response) => response.data);
};

export const getOrderApi = (order: OrderModel) => {
    return connect.post(`/order`, order);
};