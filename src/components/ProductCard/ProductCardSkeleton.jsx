import styles from './ProductCard.module.css';

function ProductCardSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLineShort} />
      <div className={styles.skeletonLineTiny} />
    </div>
  );
}

export default ProductCardSkeleton;
