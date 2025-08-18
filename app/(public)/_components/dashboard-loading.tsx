import React from 'react';
import { Loader2 } from "lucide-react";

interface DashboardLoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function DashboardLoading({ 
  message = "Loading...", 
  size = "md",
  className = ""
}: DashboardLoadingProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10", 
    lg: "h-16 w-16"
  };

  const containerClasses = {
    sm: "py-8",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-20"
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-[50vh] ${containerClasses[size]} ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary mb-4`} />
      <p className="text-lg text-gray-700 font-medium">{message}</p>
    </div>
  );
}

// Full page loading variant
export function DashboardFullPageLoading({ 
  message = "Loading...",
  className = ""
}: Omit<DashboardLoadingProps, 'size'>) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50 ${className}`}>
      <Loader2 className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin mb-4" />
      <p className="text-lg text-primary font-semibold">{message}</p>
    </div>
  );
}

// Inline loading variant for buttons and small areas
export function DashboardInlineLoading({ 
  message,
  className = ""
}: Omit<DashboardLoadingProps, 'size'>) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="w-4 h-4 animate-spin text-primary mr-2" />
      {message && <span className="text-sm text-gray-600">{message}</span>}
    </div>
  );
}
