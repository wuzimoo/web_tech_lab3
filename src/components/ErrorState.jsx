function ErrorState({ message = 'Щось пішло не так', onRetry }) {
  return (
    <div className="error-state">
      <p>{message}</p>
      {onRetry ? (
        <button className="btn" type="button" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </div>
  )
}

export default ErrorState
