import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductById,
} from '../../api/productApi';

export const fetchProductsAndCategories = createAsyncThunk(
  'products/fetchProductsAndCategories',
  async (_, { rejectWithValue }) => {
    try {
      const [products, categories] = await Promise.all([
        fetchAllProducts(),
        fetchCategories(),
      ]);

      return {
        products,
        categories,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ??
          error.message ??
          'Unable to fetch products right now.',
      );
    }
  },
);

export const fetchProductDetail = createAsyncThunk(
  'products/fetchProductDetail',
  async (productId, { rejectWithValue }) => {
    try {
      const product = await fetchProductById(productId);
      return product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ??
          error.message ??
          'Unable to fetch this product right now.',
      );
    }
  },
);
