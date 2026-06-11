import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEARCH_DEBOUNCE_MS } from '../../utils/constants';
import styles from './Header.module.css';

function Header({ searchTerm, onSearch }) {
  const [value, setValue] = useState(searchTerm);

  useEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onSearch(value);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [onSearch, value]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link aria-label="Go to homepage" className={styles.logo} to="/">
          <span className={styles.logoBadge}>L</span>
          <div>
            <strong>Leegality</strong>
            <span>Storefront</span>
          </div>
        </Link>

        <label className={styles.searchBar}>
          <span className="visually-hidden">Search products</span>
          <svg
            aria-hidden="true"
            className={styles.searchIcon}
            viewBox="0 0 24 24"
          >
            <path
              d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.44 4.44 1.41-1.41-4.44-4.44A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"
              fill="currentColor"
            />
          </svg>
          <input
            aria-label="Search by title, brand, or category"
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search products, brands, or categories"
            type="search"
            value={value}
          />
        </label>

        <div className={styles.actions}>
          <button aria-label="Cart" className={styles.iconButton} type="button">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6.2 6l.34 2H20l-1.5 6.5H8.1L6.3 4H3V2h4.9l.7 4Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button aria-label="User account" className={styles.iconButton} type="button">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
