// src/components/FailureView.jsx -->Displays error state with retry (on failed API fetch).
export default function FailureView({ onRetry }) {
  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/list-creation-failure-lg-output.png"
        alt="failure view"
        className="failure-image"
      />
      <h2 className="failure-title">Something Went Wrong</h2>
      <button onClick={onRetry} className="button">
        Try Again
      </button>
    </div>
  )
}
