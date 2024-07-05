import axiosInstance from "./axiosInstance";
import { endpoints } from "./endpoints";

export const getProducts = async (language = "en") => {
    try {
        const response = await axiosInstance.get(`${endpoints.productList}?lang=${language}`);
        return response.data?.data?.products ?? [];
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};