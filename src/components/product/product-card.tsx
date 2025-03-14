'use client';

import { ProductCardProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';
import useCartStore from '@/lib/store/cart-store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductCard({
	product,
	onAddToCart,
}: ProductCardProps) {
	const addItemToCart = useCartStore((state) => state.addItem);
	const router = useRouter();
	const [imageError, setImageError] = useState<boolean>(false);

	const handleAddToCart = () => {
		if (onAddToCart) {
			onAddToCart(product);
		} else {
			addItemToCart(product);
		}

		toast(`${product.title} added to cart`, {
			description: `Price: $${product.price.toFixed(2)}`,
			action: {
				label: 'View Cart',
				onClick: () => router.push('/cart'),
			},
		});
	};

	const handleImageError = (): void => {
		setImageError(true);
	};

	return (
		<Card className='h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow'>
			<Link
				href={`/products/${product.id}`}
				className='flex-1 flex flex-col'
			>
				<div className='relative h-48  p-4 flex items-center justify-center'>
					{!imageError ? (
						<Image
							src={product.image}
							alt={product.title}
							width={120}
							height={120}
							className='object-contain max-h-full'
							priority={false}
							onError={handleImageError}
							unoptimized={true}
						/>
					) : (
						<div className='flex items-center justify-center h-full w-full text-gray-400'>
							Image unavailable
						</div>
					)}
				</div>
				<CardContent className='flex-1 p-4'>
					<div className='flex justify-between mb-2'>
						<Badge
							variant='outline'
							className='text-xs'
						>
							{product.category}
						</Badge>
						<div className='flex items-center text-yellow-500'>
							<Star className='h-3 w-3 fill-current mr-1' />
							<span className='text-xs'>
								{product.rating.rate} ({product.rating.count})
							</span>
						</div>
					</div>
					<h3 className='font-medium text-sm line-clamp-2 mb-2'>
						{product.title}
					</h3>
					<p className='font-bold'>${product.price.toFixed(2)}</p>
				</CardContent>
			</Link>
			<CardFooter className='p-4 pt-0'>
				<Button
					onClick={handleAddToCart}
					variant='outline'
					className='w-full'
					size='sm'
				>
					<ShoppingCart className='h-4 w-4 mr-2' /> Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
}
