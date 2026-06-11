import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../../components/EmptyState/EmptyState';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Filters from '../../components/Filters/Filters';
import Header from '../../components/Header/Header';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductCardSkeleton from '../../components/ProductCard/ProductCardSkeleton';
import { useFilters } from '../../hooks/useFilters';
import { useProducts } from '../../hooks/useProducts';
import { QUERY_KEYS } from '../../utils/constants';
import styles from './ProductListPage.module.css';

function parseFiltersFromQuery(searchParams) {
  const brands = searchParams.getAll(QUERY_KEYS.brand);
  const page = Number(searchParams.get(QUERY_KEYS.page) ?? '1');

  return {
    selectedCategory: searchParams.get(QUERY_KEYS.category) ?? '',
    selectedBrands: brands,
    minPrice: searchParams.get(QUERY_KEYS.minPrice) ?? '',
    maxPrice: searchParams.get(QUERY_KEYS.maxPrice) ?? '',
    searchTerm: searchParams.get(QUERY_KEYS.search) ?? '',
    currentPage: Number.isNaN(page) ? 1 : page,
  };
}

function createSearchParamsFromState(filters) {
  const params = new URLSearchParams();

  if (filters.selectedCategory) {
    params.set(QUERY_KEYS.category, filters.selectedCategory);
  }

  filters.selectedBrands.forEach((brand) => {
    params.append(QUERY_KEYS.brand, brand);
  });

  if (filters.minPrice !== '') {
    params.set(QUERY_KEYS.minPrice, filters.minPrice);
  }

  if (filters.maxPrice !== '') {
    params.set(QUERY_KEYS.maxPrice, filters.maxPrice);
  }

  if (filters.searchTerm) {
    params.set(QUERY_KEYS.search, filters.searchTerm);
  }

  if (filters.currentPage > 1) {
    params.set(QUERY_KEYS.page, String(filters.currentPage));
  }

  return params;
}

function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const hasLoadedQueryState = useRef(false);
  const hasRestoredScroll = useRef(false);

  const {
    products,
    paginatedProducts,
    filteredProducts,
    currentPage,
    totalPages,
    loading,
    error,
    scrollPosition,
    fetchCatalog,
    changePage,
  } = useProducts();

  const {
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
  } = useFilters();

  useEffect(() => {
    document.title = 'Leegality Store | Products';
  }, []);

  useEffect(() => {
    if (!hasLoadedQueryState.current) {
      const queryState = parseFiltersFromQuery(searchParams);
      const hasQueryFilters = [...searchParams.keys()].length > 0;

      if (hasQueryFilters) {
        syncFiltersFromQuery(queryState);
      }

      hasLoadedQueryState.current = true;
    }
  }, [searchParams, syncFiltersFromQuery]);

  useEffect(() => {
    if (!loading && !error && products.length === 0) {
      fetchCatalog();
    }
  }, [error, fetchCatalog, loading, products.length]);

  useEffect(() => {
    if (!hasLoadedQueryState.current) {
      return;
    }

    const params = createSearchParamsFromState(filters);
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (!loading && !hasRestoredScroll.current && (products.length > 0 || error)) {
      window.scrollTo({ top: scrollPosition, behavior: 'auto' });
      hasRestoredScroll.current = true;
    }
  }, [error, loading, products.length, scrollPosition]);

  const skeletonCards = useMemo(
    () => Array.from({ length: 8 }, (_, index) => `skeleton-${index}`),
    [],
  );

  return (
    <div className={styles.page}>
      <Header searchTerm={filters.searchTerm} onSearch={updateSearchTerm} />

      <main className={`container ${styles.main}`}>
        <div className={styles.mobileToolbar}>
          <button
            aria-label="Open filters"
            className={styles.filterButton}
            onClick={() => setIsDrawerOpen(true)}
            type="button"
          >
            Filters
          </button>
          <p className={styles.resultCount}>
            {filteredProducts.length} products found
          </p>
        </div>

        <div className={styles.layout}>
          <aside className={styles.filtersColumn}>
            <Filters
              brands={brands}
              categories={categories}
              filters={filters}
              onCategoryChange={updateCategory}
              onBrandToggle={updateBrand}
              onMinPriceChange={updateMinPrice}
              onMaxPriceChange={updateMaxPrice}
              onReset={resetFilters}
            />
          </aside>

          <Filters
            brands={brands}
            categories={categories}
            filters={filters}
            isDrawerOpen={isDrawerOpen}
            isMobileDrawer
            onCategoryChange={updateCategory}
            onBrandToggle={updateBrand}
            onCloseDrawer={() => setIsDrawerOpen(false)}
            onMinPriceChange={updateMinPrice}
            onMaxPriceChange={updateMaxPrice}
            onReset={resetFilters}
          />

          <section aria-label="Products" className={styles.productsSection}>
            {error ? (
              <ErrorMessage message={error} onRetry={fetchCatalog} />
            ) : loading ? (
              <div className={styles.grid}>
                {skeletonCards.map((cardId) => (
                  <ProductCardSkeleton key={cardId} />
                ))}
              </div>
            ) : filteredProducts.length ? (
              <>
                <div className={styles.desktopSummary}>
                  <p className={styles.resultCount}>
                    Showing {paginatedProducts.length} of {filteredProducts.length}{' '}
                    products
                  </p>
                  <button
                    className={styles.clearButton}
                    onClick={resetFilters}
                    type="button"
                  >
                    Clear filters
                  </button>
                </div>

                <div className={styles.grid}>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  onPageChange={changePage}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <EmptyState
                actionLabel="Reset filters"
                message="Try adjusting your filters."
                onAction={resetFilters}
                title="No products found"
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProductListPage;
