import { createSelector } from '@reduxjs/toolkit';
import { PRODUCTS_PER_PAGE } from '../../utils/constants';

export const selectProductState = (state) => state.products;

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products,
);

export const selectFilteredProducts = createSelector(
  selectProductState,
  (state) => state.filteredProducts,
);

export const selectCategories = createSelector(
  selectProductState,
  (state) => state.categories,
);

export const selectBrands = createSelector(
  selectProductState,
  (state) => state.brands,
);

export const selectFilters = createSelector(selectProductState, (state) => ({
  selectedCategory: state.selectedCategory,
  selectedBrands: state.selectedBrands,
  minPrice: state.minPrice,
  maxPrice: state.maxPrice,
  searchTerm: state.searchTerm,
  currentPage: state.currentPage,
}));

export const selectCurrentPage = createSelector(
  selectProductState,
  (state) => state.currentPage,
);

export const selectScrollPosition = createSelector(
  selectProductState,
  (state) => state.scrollPosition,
);

export const selectLoading = createSelector(
  selectProductState,
  (state) => state.loading,
);

export const selectError = createSelector(
  selectProductState,
  (state) => state.error,
);

export const selectDetailLoading = createSelector(
  selectProductState,
  (state) => state.detailLoading,
);

export const selectDetailError = createSelector(
  selectProductState,
  (state) => state.detailError,
);

export const selectProductDetails = createSelector(
  selectProductState,
  (state) => state.productDetails,
);

export const selectProductById = createSelector(
  [selectProductDetails, (_, productId) => Number(productId)],
  (productDetails, productId) => productDetails[productId],
);

export const selectTotalPages = createSelector(
  selectFilteredProducts,
  (filteredProducts) =>
    Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)),
);
