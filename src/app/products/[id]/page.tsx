'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/services/api';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import useCartStore from '@/lib/store/cart-store';
import { Product } from '@/types';

const Page = (): React.ReactElement => {
	const params = useParams();
	const router = useRouter();
	const productId = params.id as string;
	const [imageError, setImageError] = useState<boolean>(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const addItemToCart = useCartStore((state) => state.addItem);

	// Handle hydration mismatch by ensuring client-side rendering for dynamic content
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const {
		data: product,
		isLoading,
		error,
	} = useQuery<Product, Error>({
		queryKey: ['product', productId],
		queryFn: () => getProductById(productId),
	});

	const handleAddToCart = (): void => {
		if (!product) return;

		// Add item to cart
		addItemToCart(product);

		toast(`${product.title} added to cart`, {
			description: `Price: $${product.price.toFixed(2)}`,
			action: {
				label: 'View Cart',
				onClick: () => router.push('/cart'),
			},
		});
	};

	// Handle image loading errors
	const handleImageError = (): void => {
		setImageError(true);
	};

	const handleGoBack = (): void => {
		router.back();
	};

	// Loading state
	if (isLoading) {
		return (
			<div className='container max-w-4xl mx-auto px-4 py-4 sm:py-6 md:py-8'>
				<Button
					variant='ghost'
					size='sm'
					onClick={handleGoBack}
					className='mb-4 sm:mb-6'
				>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back
				</Button>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
					<Skeleton className='h-64 sm:h-80 md:h-96 w-full rounded-md' />
					<div className='space-y-2 sm:space-y-4'>
						<Skeleton className='h-8 sm:h-10 w-3/4' />
						<Skeleton className='h-5 sm:h-6 w-1/4' />
						<Skeleton className='h-5 sm:h-6 w-1/3' />
						<Skeleton className='h-10 sm:h-12 w-2/3' />
						<Skeleton className='h-24 sm:h-32 w-full' />
					</div>
				</div>
			</div>
		);
	}

	// Error state
	if (error || !product) {
		return (
			<div className='container max-w-4xl mx-auto px-4 py-4 sm:py-6 md:py-8 text-center'>
				<h2 className='text-xl sm:text-2xl font-bold text-red-600'>
					Error loading product
				</h2>
				<p className='mt-2 text-gray-600'>
					{error?.message || 'Product not found'}
				</p>
				<Button
					onClick={handleGoBack}
					className='mt-4'
				>
					Go Back
				</Button>
			</div>
		);
	}

	return (
		<div className='container max-w-4xl mx-auto px-4 py-4 sm:py-6 md:py-8'>
			{/* Back button - responsive sizing */}
			<Button
				variant='ghost'
				size='sm'
				onClick={handleGoBack}
				className='mb-4 sm:mb-6'
			>
				<ArrowLeft className='h-4 w-4 mr-2' /> Back to Products
			</Button>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
				{/* Product Image - responsive container */}
				<div className='bg-white p-4 sm:p-6 md:p-8 rounded-lg border flex items-center justify-center'>
					<div className='relative h-64 sm:h-80 md:h-96 w-full flex items-center justify-center'>
						{!imageError ? (
							<Image
								src={product.image}
								alt={product.title}
								className='object-contain max-h-full max-w-full'
								priority={false}
								onError={handleImageError}
								unoptimized={true}
								fill
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							/>
						) : (
							<div className='flex items-center justify-center h-full w-full text-gray-400'>
								Image unavailable
							</div>
						)}
					</div>
				</div>

				{/* Product Details - responsive spacing */}
				<div className='space-y-4 sm:space-y-5 md:space-y-6'>
					<div>
						<h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>
							{product.title}
						</h1>
						<Badge className='mt-2'>{product.category}</Badge>
					</div>

					{/* Optional chaining for type safety */}
					{product.rating && (
						<div className='flex items-center'>
							<div className='flex items-center text-yellow-500 mr-4'>
								<Star className='h-4 w-4 sm:h-5 sm:w-5 fill-current mr-1' />
								<span>{product.rating.rate.toFixed(1)}</span>
							</div>
							<span className='text-sm text-gray-500'>
								{product.rating.count} reviews
							</span>
						</div>
					)}

					<div className='text-2xl sm:text-3xl font-bold'>
						${product.price.toFixed(2)}
					</div>

					<div>
						<h3 className='text-lg font-medium mb-2'>Description</h3>
						<p className='text-gray-600'>{product.description}</p>
					</div>

					<Button
						onClick={handleAddToCart}
						className='w-full'
					>
						<ShoppingCart className='h-5 w-5 mr-2' /> Add to Cart
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Page;
