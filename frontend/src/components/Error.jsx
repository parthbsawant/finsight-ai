import React from 'react';
import { AlertCircle } from 'lucide-react';

const Error = ({ message = 'Something went wrong', retry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-red-50 border border-red-100 rounded-xl">
      <AlertCircle className="w-10 h-10 text-brand-red" />
      <p className="text-red-800 font-medium text-center">{message}</p>
      {retry && (
        <button 
          onClick={retry}
          className="px-4 py-2 mt-2 bg-white hover:bg-red-50 transition-colors rounded-lg border border-red-200 text-sm text-brand-red font-medium shadow-sm"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
