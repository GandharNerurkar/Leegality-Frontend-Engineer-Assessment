import { memo } from 'react';
import styles from './Rating.module.css';

function Rating({ rating }) {
  const roundedRating = Number(rating ?? 0).toFixed(1);
  const fullStars = Math.round(Number(rating ?? 0));

  return (
    <div aria-label={`Rating ${roundedRating} out of 5`} className={styles.rating}>
      <div aria-hidden="true" className={styles.stars}>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            className={index < fullStars ? styles.activeStar : styles.star}
            key={`star-${index}`}
          >
            ★
          </span>
        ))}
      </div>
      <span className={styles.value}>{roundedRating}</span>
    </div>
  );
}

export default memo(Rating);
