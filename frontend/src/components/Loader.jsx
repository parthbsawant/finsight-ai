import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
      <p className="text-light-textMuted text-sm font-medium">{message}</p>
    </div>
  );
};

export default Loader;
