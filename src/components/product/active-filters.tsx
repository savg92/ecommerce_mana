import { Badge } from '@/components/ui/badge';

interface ActiveFiltersProps {
  query: string;
  selectedCategory: string | null;
}

export default function ActiveFilters({
  query,
  selectedCategory
}: ActiveFiltersProps): React.ReactElement | null {
  if (!query && !selectedCategory) return null;
  
  return (
    <div className="flex items-center mb-4">
      <span className="text-sm text-gray-500 mr-2">Filters:</span>
      <div className="flex flex-wrap gap-2">
        {query && (
          <Badge variant="secondary" className="text-xs">
            Search: {query}
          </Badge>
        )}
        {selectedCategory && (
          <Badge variant="secondary" className="text-xs">
            Category: {selectedCategory}
          </Badge>
        )}
      </div>
    </div>
  );
}