'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home } from 'lucide-react';
import { ErrorPageProps } from '@/types';

export default function Error({
  error,
  reset
}: ErrorPageProps): React.ReactElement {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
        <p className="text-lg text-gray-600 mb-8">
          We&apos;ve encountered an unexpected error. Please try again or return to the products page.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => reset()} 
            className="w-full sm:w-auto"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button 
            variant="outline" 
            asChild 
            className="w-full sm:w-auto"
          >
            <Link href="/products">
              <Home className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
        
        {/* Error details for debugging - only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-left p-4 bg-gray-50 rounded-md">
            <p className="font-medium text-sm">Error details:</p>
            <p className="text-sm text-gray-500 overflow-auto max-h-28">
              {error.message || 'Unknown error occurred'}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}