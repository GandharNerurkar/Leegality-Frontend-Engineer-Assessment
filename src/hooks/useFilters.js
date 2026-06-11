import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBrands,
  selectCategories,
  selectFilters,
} from '../features/products/productSelectors';
import {
  clearAllFilters,
  hydrateFiltersFromQuery,
  setMaxPrice,
  setMinPrice,
  setSearchTerm,
  setSelectedCategory,
  toggleSelectedBrand,
} from '../features/products/productSlice';

export function useFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);

  const updateCategory = useCallback(
    (category) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch],
  );

  const updateBrand = useCallback(
    (brand) => {
      dispatch(toggleSelectedBrand(brand));
    },
    [dispatch],
  );

  const updateMinPrice = useCallback(
    (value) => {
      dispatch(setMinPrice(value));
    },
    [dispatch],
  );

  const updateMaxPrice = useCallback(
    (value) => {
      dispatch(setMaxPrice(value));
    },
    [dispatch],
  );

  const updateSearchTerm = useCallback(
    (value) => {
      dispatch(setSearchTerm(value));
    },
    [dispatch],
  );

  const resetFilters = useCallback(() => {
    dispatch(clearAllFilters());
  }, [dispatch]);

  const syncFiltersFromQuery = useCallback(
    (payload) => {
      dispatch(hydrateFiltersFromQuery(payload));
    },
    [dispatch],
  );

  return {
    filters,
    categories,
    brands,
    updateCategory,
    updateBrand,
    updateMinPrice,
    updateMaxPrice,
    updateSearchTerm,
    resetFilters,
    syncFiltersFromQuery,
  };
}
