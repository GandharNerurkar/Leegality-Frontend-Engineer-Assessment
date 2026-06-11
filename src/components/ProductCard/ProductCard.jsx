import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setScrollPosition } from '../../features/products/productSlice';
import Rating from '../Rating/Rating';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleNavigate = useCallback(() => {
    dispatch(setScrollPosition(window.scrollY));
  }, [dispatch]);

  return (
    <Link
      aria-label={`View details for ${product.title}`}
      className={styles.card}
      onClick={handleNavigate}
      state={{ fromSearch: location.search }}
      to={`/product/${product.id}`}
    >
      <div className={styles.imageWrap}>
        <img
          alt={product.title}
          className={styles.image}
          loading="lazy"
          src={product.thumbnail}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.metaRow}>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <Rating rating={product.rating} />
        </div>
        <p className={styles.brand}>{product.brand || product.category}</p>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
