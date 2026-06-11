import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import { savePersistedProductState } from '../utils/storage';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

store.subscribe(() => {
  savePersistedProductState(store.getState().products);
});
