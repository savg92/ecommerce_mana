import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsLoading(): React.ReactElement {
  return (
    <div className="space-y-8">
      <div className="flex gap-2 overflow-x-auto pb-4">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton
            key={`skeleton-category-${index}`}
            className="h-8 w-24 rounded-full"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={`skeleton-product-${index}`} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}