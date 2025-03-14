// app/cart/page.tsx
'use client';

import useCartStore from '@/lib/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Trash2,
	Plus,
	Minus,
	ArrowRight,
	ArrowLeft,
	ShoppingCart,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function CartPage(): React.ReactElement {
	const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
		useCartStore();
	const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
	const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
	const [isMounted, setIsMounted] = useState<boolean>(false);

	// Handle hydration mismatch by ensuring client-side rendering
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Type-safe handler for quantity changes
	const handleQuantityChange = (
		productId: number,
		newQuantity: number
	): void => {
		if (newQuantity >= 1 && newQuantity <= 99) {
			updateQuantity(productId, newQuantity);
		}
	};

	// Type-safe handler for checkout
	const handleCheckout = (): void => {
		setIsCheckingOut(false);
		clearCart();

		toast.success('Order Placed Successfully. Thank you for your purchase!');
	};

	// Handle image loading errors
	const handleImageError = (itemId: number): void => {
		setImageErrors((prev) => ({
			...prev,
			[itemId]: true,
		}));
	};

	// If client-side rendering hasn't happened yet, show a simple loading state
	if (!isMounted) {
		return (
			<div className='container mx-auto px-4 py-8 sm:py-12 md:py-16'>
				<h1 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>
					Your Cart
				</h1>
				<div className='animate-pulse'>
					<div className='h-10 bg-gray-200 rounded mb-4'></div>
					<div className='h-64 bg-gray-200 rounded mb-4'></div>
					<div className='h-10 bg-gray-200 rounded w-1/2'></div>
				</div>
			</div>
		);
	}

	// Empty cart state
	if (items.length === 0) {
		return (
			<div className='container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6'>
					Your Cart is Empty
				</h1>
				<div className='flex justify-center mb-6 sm:mb-8'>
					<ShoppingCart className='h-16 w-16 sm:h-24 sm:w-24 text-gray-300' />
				</div>
				<p className='text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto'>
					Looks like you haven&apos;t added any products to your cart yet.
				</p>
				<Link href='/products'>
					<Button
						size='lg'
						className='text-base'
					>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Continue Shopping
					</Button>
				</Link>
			</div>
		);
	}

	// Cart with items - mobile-first responsive design
	return (
		<div className='container mx-auto px-4 py-8 sm:py-12 md:py-16'>
			<h1 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>Your Cart</h1>

			{/* Card view for mobile, table for larger screens */}
			<div className='block md:hidden space-y-4'>
				{items.map((item) => (
					<div
						key={item.id}
						className='border rounded-lg p-4 bg-white'
					>
						<div className='flex items-center mb-3'>
							<div className='relative h-16 w-14 mr-3 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden'>
								{item.image && !imageErrors[item.id] ? (
									<Image
										src={item.image}
										alt={item.title || 'Product image'}
										width={36}
										height={36}
										className='object-contain max-h-12 max-w-12'
										onError={() => handleImageError(item.id)}
										unoptimized={true}
										loading='eager'
									/>
								) : (
									<div className='h-full w-full flex items-center justify-center text-gray-400 text-xs'>
										No image
									</div>
								)}
							</div>
							<div className='flex-1'>
								<h3 className='font-medium line-clamp-1'>{item.title}</h3>
								<p className='text-sm text-gray-500'>
									{item.category || 'Uncategorized'}
								</p>
							</div>
						</div>

						<div className='flex justify-between items-center mb-3'>
							<span className='text-sm'>Price:</span>
							<span className='font-medium'>${item.price.toFixed(2)}</span>
						</div>

						<div className='flex justify-between items-center mb-3'>
							<span className='text-sm'>Quantity:</span>
							<div className='flex items-center'>
								<Button
									variant='outline'
									size='icon'
									onClick={() =>
										handleQuantityChange(item.id, item.quantity - 1)
									}
									disabled={item.quantity <= 1}
									type='button'
									className='h-8 w-8'
								>
									<Minus size={14} />
								</Button>
								<Input
									type='number'
									value={item.quantity}
									min={1}
									max={99}
									onChange={(e) =>
										handleQuantityChange(
											item.id,
											parseInt(e.target.value, 10) || 1
										)
									}
									className='mx-2 w-[50px] text-center h-8 p-1'
								/>
								<Button
									variant='outline'
									size='icon'
									onClick={() =>
										handleQuantityChange(item.id, item.quantity + 1)
									}
									disabled={item.quantity >= 99}
									type='button'
									className='h-8 w-8'
								>
									<Plus size={14} />
								</Button>
							</div>
						</div>

						<div className='flex justify-between items-center mb-3'>
							<span className='text-sm'>Subtotal:</span>
							<span className='font-bold'>
								${(item.price * item.quantity).toFixed(2)}
							</span>
						</div>

						<div className='flex justify-end'>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant='outline'
										size='sm'
										className='text-red-500 border-red-200'
									>
										<Trash2
											size={14}
											className='mr-1'
										/>{' '}
										Remove
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you sure?</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete
											the item from your cart.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={() => removeItem(item.id)}>
											Delete
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>
				))}

				<div className='border-t border-b py-4 my-4'>
					<div className='flex justify-between items-center'>
						<span className='font-bold'>Total:</span>
						<span className='font-bold text-xl'>
							${getTotalPrice().toFixed(2)}
						</span>
					</div>
				</div>
			</div>

			{/* Table view for tablet and desktop */}
			<div className='hidden md:block overflow-x-auto'>
				<table className='min-w-full bg-white border border-gray-200 rounded-lg'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='py-3 px-4 text-left font-semibold text-gray-700'>
								Product
							</th>
							<th className='py-3 px-4 text-left font-semibold text-gray-700'>
								Price
							</th>
							<th className='py-3 px-4 text-left font-semibold text-gray-700'>
								Quantity
							</th>
							<th className='py-3 px-4 text-left font-semibold text-gray-700'>
								Total
							</th>
							<th className='py-3 px-4 text-left font-semibold text-gray-700'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr
								key={item.id}
								className='border-b border-gray-200 hover:bg-gray-50'
							>
								<td className='py-4 px-4'>
									<div className='flex items-center'>
										<div className='relative h-14 w-14 mr-4 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden'>
											{item.image && !imageErrors[item.id] ? (
												<div className='flex items-center justify-center w-full h-full'>
													<Image
														src={item.image}
														alt={item.title || 'Product image'}
														width={48}
														height={48}
														className='object-contain max-h-12 max-w-12'
														onError={() => handleImageError(item.id)}
														unoptimized={true}
														loading='eager'
													/>
												</div>
											) : (
												<div className='h-full w-full flex items-center justify-center text-gray-400 text-xs'>
													No image
												</div>
											)}
										</div>
										<span className='line-clamp-1'>{item.title}</span>
									</div>
								</td>
								<td className='py-4 px-4'>${item.price.toFixed(2)}</td>
								<td className='py-4 px-4'>
									<div className='flex items-center'>
										<Button
											variant='outline'
											size='icon'
											onClick={() =>
												handleQuantityChange(item.id, item.quantity - 1)
											}
											disabled={item.quantity <= 1}
											type='button'
										>
											<Minus size={16} />
										</Button>
										<Input
											type='number'
											value={item.quantity}
											min={1}
											max={99}
											onChange={(e) =>
												handleQuantityChange(
													item.id,
													parseInt(e.target.value, 10) || 1
												)
											}
											className='mx-2 w-[60px] text-center'
										/>
										<Button
											variant='outline'
											size='icon'
											onClick={() =>
												handleQuantityChange(item.id, item.quantity + 1)
											}
											disabled={item.quantity >= 99}
											type='button'
										>
											<Plus size={16} />
										</Button>
									</div>
								</td>
								<td className='py-4 px-4'>
									${(item.price * item.quantity).toFixed(2)}
								</td>
								<td className='py-4 px-4'>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant='ghost'
												size='icon'
												type='button'
											>
												<Trash2 size={16} />
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Are you sure?</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone. This will permanently
													delete the item from your cart.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction onClick={() => removeItem(item.id)}>
													Delete
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td
								colSpan={3}
								className='py-4 px-4 text-right font-bold'
							>
								Total:
							</td>
							<td
								colSpan={2}
								className='py-4 px-4'
							>
								${getTotalPrice().toFixed(2)}
							</td>
						</tr>
					</tfoot>
				</table>
				<div className='mt-8 flex justify-between'>
					<Link href='/products'>
						<Button
							variant='outline'
							type='button'
						>
							<ArrowLeft className='mr-2' />
							Continue Shopping
						</Button>
					</Link>
					<Button
						onClick={() => setIsCheckingOut(true)}
						type='button'
					>
						Checkout
						<ArrowRight className='ml-2' />
					</Button>
				</div>
			</div>
			<AlertDialog
				open={isCheckingOut}
				onOpenChange={setIsCheckingOut}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Checkout</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to proceed to checkout? This will place your
							order.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setIsCheckingOut(false)}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction onClick={handleCheckout}>
							Confirm
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
