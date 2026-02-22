export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-soft overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
            {children}
        </div>
    );
}
