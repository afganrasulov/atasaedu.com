import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && <label className="block text-sm font-medium mb-1.5 text-gray-700">{label}</label>}
                <input
                    ref={ref}
                    className={`flex h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-red-500 focus:ring-red-500" : ""
                        } ${className}`}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-500 transition-opacity">{error}</p>}
            </div>
        );
    }
);
Input.displayName = "Input";
