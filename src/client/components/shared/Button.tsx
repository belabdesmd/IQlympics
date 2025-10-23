import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const combinedClassName = `${baseClass} ${variantClass} ${className}`.trim();

  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className="spinner" />}
      {children}
    </button>
  );
};