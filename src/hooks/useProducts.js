import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectDetailError,
  selectDetailLoading,
  selectError,
  selectFilteredProducts,
  selectLoading,
  selectProductById,
  selectProducts,
  selectScrollPosition,
  selectTotalPages,
} from '../features/products/productSelectors';
import {
  clearDetailError,
  clearProductsError,
  setCurrentPage,
  setScrollPosition,
} from '../features/products/productSlice';
import {
  fetchProductDetail,
  fetchProductsAndCategories,
} from '../features/products/productThunks';
import { PRODUCTS_PER_PAGE } from '../utils/constants';

export function useProducts(productId) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const detailLoading = useSelector(selectDetailLoading);
  const detailError = useSelector(selectDetailError);
  const scrollPosition = useSelector(selectScrollPosition);
  const selectedProduct = useSelector((state) =>
    productId ? selectProductById(state, productId) : null,
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  const fetchCatalog = useCallback(
    () => dispatch(fetchProductsAndCategories()),
    [dispatch],
  );

  const fetchDetail = useCallback(
    (id) => dispatch(fetchProductDetail(id)),
    [dispatch],
  );

  const changePage = useCallback(
    (page) => dispatch(setCurrentPage(page)),
    [dispatch],
  );

  const clearCatalogError = useCallback(
    () => dispatch(clearProductsError()),
    [dispatch],
  );

  const clearProductError = useCallback(
    () => dispatch(clearDetailError()),
    [dispatch],
  );

  const saveScrollPosition = useCallback(
    (value) => dispatch(setScrollPosition(value)),
    [dispatch],
  );

  return {
    products,
    filteredProducts,
    paginatedProducts,
    selectedProduct,
    currentPage,
    totalPages,
    loading,
    error,
    detailLoading,
    detailError,
    scrollPosition,
    fetchCatalog,
    fetchDetail,
    changePage,
    clearCatalogError,
    clearProductError,
    saveScrollPosition,
  };
}
