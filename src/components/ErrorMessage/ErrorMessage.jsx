import styles from './ErrorMessage.module.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.card} role="alert">
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <button className={styles.button} onClick={onRetry} type="button">
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;
