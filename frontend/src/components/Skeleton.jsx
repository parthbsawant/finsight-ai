import React from 'react';
import { cn } from './Card';

const Skeleton = ({ className }) => {
  return (
    <div className={cn("animate-pulse bg-slate-200 rounded-md", className)}></div>
  );
};

export const CardSkeleton = () => (
  <div className="bg-white border border-light-border shadow-soft rounded-xl p-6 flex flex-col">
    <Skeleton className="h-6 w-1/3 mb-4" />
    <Skeleton className="h-4 w-1/2 mb-6" />
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-white border border-light-border shadow-soft rounded-xl p-6 h-[400px] flex items-center justify-center">
     <div className="space-y-4 w-full h-full flex flex-col justify-end pb-4">
        <Skeleton className="h-full w-full opacity-50" />
     </div>
  </div>
);

export default Skeleton;
