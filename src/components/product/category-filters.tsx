import { Badge } from '@/components/ui/badge';

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}

export default function CategoryFilters({
  categories,
  selectedCategory,
  onCategoryClick
}: CategoryFiltersProps): React.ReactElement {
  if (categories.length === 0) return <></>;
  
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          className="cursor-pointer text-sm py-1 px-3"
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}