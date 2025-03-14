'use client';

import { useQuery } from '@tanstack/react-query';
import { getProducts, getCategories } from '@/services/api';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useState, useMemo, useEffect } from 'react';
import ProductGrid from '@/components/product/product-grid';
import CategoryFilters from '@/components/product/category-filters';
import ProductsLoading from '@/components/product/products-loading';
import ProductsError from '@/components/product/products-error';
import ProductsPagination from '@/components/product/products-pagination';
import ActiveFilters from '@/components/product/active-filters';

// Type-safe constant
const PRODUCTS_PER_PAGE: number = 8;

export default function ProductsPage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch products and categories
  const { 
    data: products, 
    isLoading: productsLoading, 
    error: productsError 
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories } = useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Filter products by category and search query
  const filteredProducts = useMemo<Product[]>(() => {
    if (!products) return [];

    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (query) {
      const lowercaseQuery = query.toLowerCase().trim();
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.category.toLowerCase().includes(lowercaseQuery)
      );
    }

    return filtered;
  }, [products, selectedCategory, query]);

  // Pagination calculations
  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));
  
  // Ensure currentPage is valid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      updatePage(1);
    }
  }, [totalPages, currentPage]);

  // Get current page products
  const currentProducts = useMemo<Product[]>(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Handler for category selection
  const handleCategoryClick = (category: string): void => {
    setSelectedCategory(prev => prev === category ? null : category);
    updatePage(1); // Reset to first page when changing category
  };

  // Update page in URL
  const updatePage = (page: number): void => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    router.push(`/products?${params.toString()}`);
  };

  if (productsLoading) return <ProductsLoading />;
  if (productsError) return <ProductsError message={productsError.message} />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        
        <CategoryFilters 
          categories={categories || []} 
          selectedCategory={selectedCategory} 
          onCategoryClick={handleCategoryClick} 
        />
        
        <ActiveFilters 
          query={query} 
          selectedCategory={selectedCategory} 
        />
      </div>

      <ProductGrid 
        products={currentProducts} 
      />
      
      {totalPages > 1 && (
        <ProductsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={totalProducts}
          itemsPerPage={PRODUCTS_PER_PAGE}
          onPageChange={updatePage}
        />
      )}
    </div>
  );
}