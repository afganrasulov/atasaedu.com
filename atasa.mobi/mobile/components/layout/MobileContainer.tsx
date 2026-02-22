import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`px-4 py-6 space-y-6 ${className}`}>
      {children}
    </div>
  );
};