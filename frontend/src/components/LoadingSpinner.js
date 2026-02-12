import React from 'react';
import '../styles/App.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading tasks...</p>
    </div>
  );
}

export default LoadingSpinner;
