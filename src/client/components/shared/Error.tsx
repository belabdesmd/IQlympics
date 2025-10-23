import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { MdError, MdRefresh } from 'react-icons/md';

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export const Error: React.FC<ErrorProps> = ({ 
  message = 'Something went wrong. Please try again.', 
  onRetry,
  showRetry = true 
}) => {
  return (
    <Card>
      <div className="error-container">
        <div className="error-icon">
          <MdError aria-label="Error" />
        </div>
        <div className="error-content">
          <h3 className="error-title">
            Oops! Something went wrong
          </h3>
          <p className="error-message">
            {message}
          </p>
        </div>
        {showRetry && onRetry && (
          <Button variant="primary" onClick={onRetry}>
            <MdRefresh aria-hidden="true" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};