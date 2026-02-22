import React from 'react';

interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const MobileButton: React.FC<MobileButtonProps> = ({ 
  children, onClick, variant = 'primary', fullWidth = true, disabled, className = "", icon 
}) => {
  const baseStyles = "h-[54px] rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all m-touch select-none";
  
  const variants = {
    primary: "bg-[#0047BB] text-white shadow-lg shadow-blue-200",
    secondary: "bg-slate-100 text-slate-900",
    outline: "bg-white border-2 border-slate-200 text-slate-900",
    ghost: "bg-transparent text-[#0047BB]"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : 'px-8'} ${disabled ? 'opacity-50 grayscale' : ''} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
};