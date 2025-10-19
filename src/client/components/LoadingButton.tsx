import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'disabled';
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText,
  children,
  variant = 'primary',
  disabled,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'btn-game-primary',
    secondary: 'btn-game-secondary',
    success: 'btn-game-success',
    error: 'btn-game-error',
    disabled: 'btn-game-disabled',
  };

  const isDisabled = disabled || loading;
  const currentVariant = isDisabled ? 'disabled' : variant;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`${variantClasses[currentVariant]} ${className} relative`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" color="white" />
        </div>
      )}
      
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {loading && loadingText ? loadingText : children}
      </span>
    </button>
  );
};