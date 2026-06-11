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
                <p className={styles.category}>{selectedProduct.category}</p>
                <h1 className={styles.title}>{selectedProduct.title}</h1>
                <div className={styles.ratingRow}>
                  <Rating rating={selectedProduct.rating} />
                  <span className={styles.stock}>
                    {selectedProduct.stock > 0 ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
                <p className={styles.price}>
                  ${selectedProduct.price.toFixed(2)}
                </p>
                <p className={styles.description}>
                  {selectedProduct.description}
                </p>

                <dl className={styles.metaGrid}>
                  <div>
                    <dt>Brand</dt>
                    <dd>{selectedProduct.brand || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt>Category</dt>
                    <dd>{selectedProduct.category}</dd>
                  </div>
                  <div>
                    <dt>Stock</dt>
                    <dd>{selectedProduct.stock}</dd>
                  </div>
                  <div>
                    <dt>Discount</dt>
                    <dd>{selectedProduct.discountPercentage}%</dd>
                  </div>
                </dl>
              </div>
            </section>

            {selectedProduct.images?.length ? (
              <section className={styles.gallerySection}>
                <h2 className={styles.galleryTitle}>Product gallery</h2>
                <div className={styles.gallery}>
                  {selectedProduct.images.map((image, index) => (
                    <img
                      alt={`${selectedProduct.title} view ${index + 1}`}
                      className={styles.galleryImage}
                      key={image}
                      src={image}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        )}
      </main>
    </div>
  );
}

export default ProductDetailPage;
