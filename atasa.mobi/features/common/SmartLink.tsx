
import React from 'react';
import * as Router from 'react-router-dom';
const { Link } = Router as any;

interface SmartLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SmartLink: React.FC<SmartLinkProps> = ({ to, children, className, onClick }) => {
  const handleMouseEnter = () => {
    // Webpack veya Vite tabanlı lazy loading prefetch tetikleyici
    // React Router v7 ve üzeri için route prefetch desteği simülasyonu
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = to;
    document.head.appendChild(link);
  };

  return (
    <Link 
      to={to} 
      className={className} 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Link>
  );
};
