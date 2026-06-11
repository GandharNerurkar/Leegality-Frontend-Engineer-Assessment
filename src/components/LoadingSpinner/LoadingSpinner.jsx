import styles from './LoadingSpinner.module.css';

function LoadingSpinner({ fullScreen = false, label = 'Loading...' }) {
  return (
    <div className={fullScreen ? styles.fullScreen : styles.wrapper}>
      <div aria-hidden="true" className={styles.spinner} />
      <p className={styles.label}>{label}</p>
    </div>
  );
}

export default LoadingSpinner;
