import React from 'react';
import { AlertCircle } from 'lucide-react';

const Error = ({ message = 'Something went wrong', retry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 glass-card border-brand-red/30">
      <AlertCircle className="w-10 h-10 text-brand-red" />
      <p className="text-gray-200 font-medium text-center">{message}</p>
      {retry && (
        <button 
          onClick={retry}
          className="px-4 py-2 mt-2 bg-dark-surface hover:bg-dark-border transition-colors rounded-lg border border-dark-border text-sm"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
