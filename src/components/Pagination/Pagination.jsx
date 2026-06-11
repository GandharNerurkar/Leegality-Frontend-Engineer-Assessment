import { memo, useMemo } from 'react';
import styles from './Pagination.module.css';

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  const normalizedStart = Math.max(1, end - 4);

  return Array.from(
    { length: end - normalizedStart + 1 },
    (_, index) => normalizedStart + index,
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages],
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className={styles.pagination}>
      <button
        className={styles.navButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        ← Previous
      </button>

      <div className={styles.pageList}>
        {pageNumbers.map((pageNumber) => (
          <button
            aria-current={pageNumber === currentPage ? 'page' : undefined}
            className={
              pageNumber === currentPage ? styles.activePage : styles.pageButton
            }
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            type="button"
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        className={styles.navButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        Next →
      </button>
    </nav>
  );
}

export default memo(Pagination);
