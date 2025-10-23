import React from 'react';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
};