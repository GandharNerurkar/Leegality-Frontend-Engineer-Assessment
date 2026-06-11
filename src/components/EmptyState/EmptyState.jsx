import styles from './EmptyState.module.css';

function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{message}</p>
      {onAction ? (
        <button className={styles.button} onClick={onAction} type="button">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export default EmptyState;
