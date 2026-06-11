import { createSlice } from '@reduxjs/toolkit';
import { filterProducts } from '../../utils/filterProducts';
import { getUniqueBrands } from '../../utils/getUniqueBrands';
import { loadPersistedProductState } from '../../utils/storage';
import {
  fetchProductDetail,
  fetchProductsAndCategories,
} from './productThunks';

const persistedState = loadPersistedProductState();

const initialState = {
  products: [],
  filteredProducts: [],
  categories: [],
  brands: [],
  productDetails: {},
  selectedCategory: persistedState.selectedCategory,
  selectedBrands: persistedState.selectedBrands,
  minPrice: persistedState.minPrice,
  maxPrice: persistedState.maxPrice,
  searchTerm: persistedState.searchTerm,
  currentPage: persistedState.currentPage,
  scrollPosition: persistedState.scrollPosition,
  loading: false,
  detailLoading: false,
  error: null,
  detailError: null,
};

function normalizeCategories(categories) {
  return categories.map((category) => {
    if (typeof category === 'string') {
      return {
        slug: category,
        name: category,
      };
    }

    return {
      slug: category.slug,
      name: category.name,
    };
  });
}

function clampPage(state) {
  const totalPages = Math.max(
    1,
    Math.ceil(state.filteredProducts.length / 12),
  );

  if (state.currentPage > totalPages) {
    state.currentPage = totalPages;
  }

  if (state.currentPage < 1) {
    state.currentPage = 1;
  }
}

function applyFilters(state, { resetPage = false } = {}) {
  state.filteredProducts = filterProducts(state.products, state);

  if (resetPage) {
    state.currentPage = 1;
  }

  clampPage(state);
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      applyFilters(state, { resetPage: true });
    },
    toggleSelectedBrand(state, action) {
      const brand = action.payload;

      if (state.selectedBrands.includes(brand)) {
        state.selectedBrands = state.selectedBrands.filter(
          (selectedBrand) => selectedBrand !== brand,
        );
      } else {
        state.selectedBrands.push(brand);
      }

      applyFilters(state, { resetPage: true });
    },
    setSelectedBrands(state, action) {
      state.selectedBrands = action.payload;
      applyFilters(state, { resetPage: true });
    },
    setMinPrice(state, action) {
      state.minPrice = action.payload;
      applyFilters(state, { resetPage: true });
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
      applyFilters(state, { resetPage: true });
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      applyFilters(state, { resetPage: true });
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
      clampPage(state);
    },
    setScrollPosition(state, action) {
      state.scrollPosition = action.payload;
    },
    clearAllFilters(state) {
      state.selectedCategory = '';
      state.selectedBrands = [];
      state.minPrice = '';
      state.maxPrice = '';
      state.searchTerm = '';
      applyFilters(state, { resetPage: true });
    },
    clearProductsError(state) {
      state.error = null;
    },
    clearDetailError(state) {
      state.detailError = null;
    },
    hydrateFiltersFromQuery(state, action) {
      const payload = action.payload;

      state.selectedCategory = payload.selectedCategory ?? state.selectedCategory;
      state.selectedBrands = payload.selectedBrands ?? state.selectedBrands;
      state.minPrice = payload.minPrice ?? state.minPrice;
      state.maxPrice = payload.maxPrice ?? state.maxPrice;
      state.searchTerm = payload.searchTerm ?? state.searchTerm;
      state.currentPage = payload.currentPage ?? state.currentPage;
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAndCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAndCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.categories = normalizeCategories(action.payload.categories);
        state.brands = getUniqueBrands(action.payload.products);
        applyFilters(state);
      })
      .addCase(fetchProductsAndCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? 'Unable to load products. Please try again.';
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.productDetails[action.payload.id] = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError =
          action.payload ?? 'Unable to load product details. Please try again.';
      });
  },
});

export const {
  clearAllFilters,
  clearDetailError,
  clearProductsError,
  hydrateFiltersFromQuery,
  setCurrentPage,
  setMaxPrice,
  setMinPrice,
  setScrollPosition,
  setSearchTerm,
  setSelectedBrands,
  setSelectedCategory,
  toggleSelectedBrand,
} = productSlice.actions;

export default productSlice.reducer;
