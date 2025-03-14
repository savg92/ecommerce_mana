'use client';

import { Product } from '@/types';
import ProductCard from './product-card';

interface ProductGridProps {
	products: Product[];
	onAddToCart?: (product: Product) => void;
}

export default function ProductGrid({
	products,
	onAddToCart,
}: ProductGridProps): React.ReactElement {
	if (products.length === 0) {
		return (
			<div className='text-center py-12'>
				<h2 className='text-2xl font-bold text-gray-700 mb-4'>
					No products found
				</h2>
				<p className='text-gray-500'>
					No products match your current filters. Try different criteria.
				</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					onAddToCart={onAddToCart}
				/>
			))}
		</div>
	);
}
