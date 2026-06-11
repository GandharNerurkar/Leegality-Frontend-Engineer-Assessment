import { memo } from 'react';
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
          <div>
            <p className={styles.eyebrow}>Narrow results</p>
            <h2>Filters</h2>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.resetButton} onClick={onReset} type="button">
              Reset
            </button>
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
          <label className={styles.option}>
            <input
              checked={filters.selectedCategory === ''}
              name="category"
              onChange={() => onCategoryChange('')}
              type="radio"
            />
            <span>All categories</span>
          </label>
          {categories.map((category) => (
            <label className={styles.option} key={category.slug}>
              <input
                checked={filters.selectedCategory === category.slug}
                name="category"
                onChange={() => onCategoryChange(category.slug)}
                type="radio"
              />
              <span>{category.name}</span>
            </label>
          ))}
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

        <div className={styles.group}>
          <h3>Price range</h3>
          <div className={styles.priceInputs}>
            <label>
              <span>Min</span>
              <input
                aria-label="Minimum price"
                min="0"
                onChange={(event) => onMinPriceChange(event.target.value)}
                placeholder="0"
                type="number"
                value={filters.minPrice}
              />
            </label>
            <label>
              <span>Max</span>
              <input
                aria-label="Maximum price"
                min="0"
                onChange={(event) => onMaxPriceChange(event.target.value)}
                placeholder="500"
                type="number"
                value={filters.maxPrice}
              />
            </label>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Filters);
