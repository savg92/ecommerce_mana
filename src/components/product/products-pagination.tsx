import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useMemo } from 'react';
import { ProductsPaginationProps } from '@/types';

export default function ProductsPagination({
  currentPage,
  totalPages,
  totalProducts,
  itemsPerPage,
  onPageChange,
}: ProductsPaginationProps): React.ReactElement {
  const paginationItems = useMemo(() => {
    const items: React.ReactNode[] = [];

    items.push(
      <PaginationItem key="page-1">
        <PaginationLink
          href="#"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            onPageChange(1);
          }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink
            href="#"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              onPageChange(i);
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            href="#"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="flex flex-col items-center space-y-2 py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {paginationItems}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : undefined}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="text-sm text-muted-foreground">
        Showing {Math.min(totalProducts, (currentPage - 1) * itemsPerPage + 1)} to{" "}
        {Math.min(totalProducts, currentPage * itemsPerPage)} of {totalProducts} products
      </div>
    </div>
  );
}