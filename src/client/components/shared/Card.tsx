import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const combinedClassName = `card ${className}`.trim();

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};