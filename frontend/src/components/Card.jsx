import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Card = ({ children, className, title, subtitle }) => {
  return (
    <div className={cn('bg-white border border-light-border shadow-soft rounded-xl p-6 flex flex-col transition-shadow duration-200 hover:shadow-float', className)}>
      {(title || subtitle) && (
        <div className="mb-5 border-b border-light-border pb-4">
          {title && <h3 className="text-lg font-bold text-light-textMain">{title}</h3>}
          {subtitle && <p className="text-sm text-light-textMuted mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Card;
