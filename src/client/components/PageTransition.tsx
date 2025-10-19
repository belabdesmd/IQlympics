import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  duration?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isVisible,
  duration = 300,
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [opacity, setOpacity] = useState(isVisible ? 1 : 0);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Small delay to ensure the element is rendered before starting transition
      const timer = setTimeout(() => setOpacity(1), 10);
      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
      // Wait for transition to complete before unmounting
      const timer = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  if (!shouldRender) return null;

  return (
    <div
      className="transition-opacity ease-in-out"
      style={{
        opacity,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};