import { memo, useMemo, useState } from 'react';
import styles from './Filters.module.css';

function Filters({
  categories,
  brands,
  filters,
  onCategoryChange,
  onBrandToggle,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
  isMobileDrawer = false,
  isDrawerOpen = false,
  onCloseDrawer,
}) {
  const wrapperClassName = isMobileDrawer
    ? `${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`
    : styles.panel;
  const categoryInputName = isMobileDrawer
    ? 'category-mobile'
    : 'category-desktop';
  const [categorySearch, setCategorySearch] = useState('');
  const visibleCategories = useMemo(() => {
    const normalizedQuery = categorySearch.trim().toLowerCase();

    if (!normalizedQuery) {
      return categories;
    }

    return categories.filter((category) =>
      category.name.toLowerCase().includes(normalizedQuery),
    );
  }, [categories, categorySearch]);

  return (
    <>
      {isMobileDrawer && isDrawerOpen ? (
        <button
          aria-label="Close filters"
          className={styles.overlay}
          onClick={onCloseDrawer}
          type="button"
        />
      ) : null}

      <section className={wrapperClassName}>
        <div className={styles.header}>
          <label className={styles.searchBar}>
            <span className="visually-hidden">Search categories</span>
            <input
              aria-label="Search categories"
              onChange={(event) => setCategorySearch(event.target.value)}
              placeholder="Search..."
              type="search"
              value={categorySearch}
            />
          </label>
          <div className={styles.headerActions}>
            {isMobileDrawer ? (
              <button
                aria-label="Close filters panel"
                className={styles.closeButton}
                onClick={onCloseDrawer}
                type="button"
              >
                Close
              </button>
            ) : null}
          </div>
        </div>

        <div className={styles.group}>
          <h3>Category</h3>
          <div className={styles.categoryList}>
            <label className={styles.option}>
              <input
                checked={filters.selectedCategory === ''}
                name={categoryInputName}
                onChange={() => onCategoryChange('')}
                type="radio"
              />
              <span>All categories</span>
            </label>
            {visibleCategories.map((category) => (
              <label className={styles.option} key={category.slug}>
                <input
                  checked={filters.selectedCategory === category.slug}
                  name={categoryInputName}
                  onChange={() => onCategoryChange(category.slug)}
                  type="radio"
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <h3>Price range</h3>
          <div className={styles.priceInputs}>
            <label>
              <input
                aria-label="Minimum price"
                min="0"
                onChange={(event) => onMinPriceChange(event.target.value)}
                placeholder="Min"
                type="number"
                value={filters.minPrice}
              />
            </label>
            <label>
              <input
                aria-label="Maximum price"
                min="0"
                onChange={(event) => onMaxPriceChange(event.target.value)}
                placeholder="Max"
                type="number"
                value={filters.maxPrice}
              />
            </label>
          </div>
        </div>

        <div className={styles.group}>
          <h3>Brand</h3>
          <div className={styles.brandList}>
            {brands.map((brand) => (
              <label className={styles.option} key={brand}>
                <input
                  checked={filters.selectedBrands.includes(brand)}
                  onChange={() => onBrandToggle(brand)}
                  type="checkbox"
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Filters);
