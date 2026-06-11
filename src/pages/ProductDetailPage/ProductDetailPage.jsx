import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Header from '../../components/Header/Header';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Rating from '../../components/Rating/Rating';
import { useFilters } from '../../hooks/useFilters';
import { useProducts } from '../../hooks/useProducts';
import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { filters, updateSearchTerm } = useFilters();
  const {
    selectedProduct,
    detailLoading,
    detailError,
    fetchDetail,
  } = useProducts(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    fetchDetail(id);
  }, [fetchDetail, id]);

  useEffect(() => {
    if (selectedProduct?.title) {
      document.title = `Leegality Store | ${selectedProduct.title}`;
      return;
    }

    document.title = 'Leegality Store | Product Details';
  }, [selectedProduct]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate({
      pathname: '/',
      search: location.state?.fromSearch ?? '',
    });
  };

  return (
    <div className={styles.page}>
      <Header searchTerm={filters.searchTerm} onSearch={updateSearchTerm} />

      <main className={`container ${styles.main}`}>
        <button
          aria-label="Go back to products"
          className={styles.backButton}
          onClick={handleBack}
          type="button"
        >
          Back to products
        </button>

        {detailError ? (
          <ErrorMessage message={detailError} onRetry={() => fetchDetail(id)} />
        ) : detailLoading || !selectedProduct ? (
          <LoadingSpinner label="Loading product details" />
        ) : (
          <article className={styles.card}>
            <section className={styles.hero}>
              <div className={styles.imagePanel}>
                <img
                  alt={selectedProduct.title}
                  className={styles.primaryImage}
                  src={selectedProduct.thumbnail}
                />
              </div>

              <div className={styles.content}>
                <h1 className={styles.title}>{selectedProduct.title}</h1>
                <div className={styles.ratingRow}>
                  <p className={styles.price}>
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                  <Rating rating={selectedProduct.rating} />
                </div>

                <div className={styles.metaBlock}>
                  <p><strong>Brand:</strong> {selectedProduct.brand || 'N/A'}</p>
                  <p><strong>Category:</strong> {selectedProduct.category}</p>
                  <p><strong>Stock:</strong> {selectedProduct.stock}</p>
                  <p><strong>Discount:</strong> {selectedProduct.discountPercentage}%</p>
                </div>

                <section className={styles.infoSection}>
                  <h2>Description</h2>
                  <p className={styles.description}>
                    {selectedProduct.description}
                  </p>
                </section>

                {selectedProduct.reviews?.length ? (
                  <section className={styles.infoSection}>
                    <h2>Reviews</h2>
                    <div className={styles.reviewList}>
                      {selectedProduct.reviews.slice(0, 2).map((review) => (
                        <article className={styles.reviewCard} key={`${review.reviewerEmail}-${review.date}`}>
                          <div className={styles.reviewHeader}>
                            <h3>{review.reviewerName}</h3>
                            <Rating rating={review.rating} />
                          </div>
                          <p>{review.comment}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </section>

          </article>
        )}
      </main>
    </div>
  );
}

export default ProductDetailPage;
