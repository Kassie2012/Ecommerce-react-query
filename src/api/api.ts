import axios from 'axios';
import type {Product, Category} from '../types/types'; // need to make

const api = axios.create({
    baseURL: 'https://fakestoreapi.com'
})

export const fetchProducts = async (): Promise<Product[]> => (await api.get<Product[]>('/products')).data;

export const fetchCategories = async (): Promise<Category[]> => (await api.get<Category[]>('/products/categories')).data;

export const fetchProductsByCategory = async (category: string): Promise<Product[]> =>
    (await api.get<Product[]>(`/products/category/${encodeURIComponent(category)}`)).data;