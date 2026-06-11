import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const productApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export async function fetchAllProducts() {
  const response = await productApi.get('/products', {
    params: { limit: 0 },
  });

  return response.data.products ?? [];
}

export async function fetchCategories() {
  const response = await productApi.get('/products/categories');

  return response.data ?? [];
}

export async function fetchProductById(id) {
  const response = await productApi.get(`/products/${id}`);

  return response.data;
}

export default productApi;
