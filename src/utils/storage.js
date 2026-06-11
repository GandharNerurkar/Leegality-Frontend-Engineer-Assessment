import { PRODUCT_STORAGE_KEY } from './constants';

const defaultPersistedState = {
  selectedCategory: '',
  selectedBrands: [],
  minPrice: '',
  maxPrice: '',
  searchTerm: '',
  currentPage: 1,
  scrollPosition: 0,
};

export function loadPersistedProductState() {
  if (typeof window === 'undefined') {
    return defaultPersistedState;
  }

  try {
    const rawState = window.localStorage.getItem(PRODUCT_STORAGE_KEY);

    if (!rawState) {
      return defaultPersistedState;
    }

    const parsedState = JSON.parse(rawState);

    return {
      ...defaultPersistedState,
      ...parsedState,
    };
  } catch (error) {
    return defaultPersistedState;
  }
}

export function savePersistedProductState(state) {
  if (typeof window === 'undefined') {
    return;
  }

  const persistedState = {
    selectedCategory: state.selectedCategory,
    selectedBrands: state.selectedBrands,
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
    searchTerm: state.searchTerm,
    currentPage: state.currentPage,
    scrollPosition: state.scrollPosition ?? 0,
  };

  window.localStorage.setItem(
    PRODUCT_STORAGE_KEY,
    JSON.stringify(persistedState),
  );
}
