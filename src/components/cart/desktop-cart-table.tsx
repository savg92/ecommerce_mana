import { DesktopCartTableProps } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import QuantityControl from './quantity-control';
import useCartStore from '@/lib/store/cart-store';
import RemoveItemDialog from './remove-item-dialog';

export default function DesktopCartTable({
	items,
	imageErrors,
	onImageError,
	totalPrice,
	onCheckout,
}: DesktopCartTableProps): React.ReactElement {
	const { updateQuantity } = useCartStore();

	const handleQuantityChange = (
		productId: number,
		newQuantity: number
	): void => {
		if (newQuantity >= 1 && newQuantity <= 99) {
			updateQuantity(productId, newQuantity);
		}
	};

	return (
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
													onError={() => onImageError(item.id)}
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
								<QuantityControl
									quantity={item.quantity}
									onQuantityChange={(newQty) =>
										handleQuantityChange(item.id, newQty)
									}
									size='default'
								/>
							</td>
							<td className='py-4 px-4'>
								${(item.price * item.quantity).toFixed(2)}
							</td>
							<td className='py-4 px-4'>
								<RemoveItemDialog
									itemId={item.id}
									isIcon={true}
								/>
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
							${totalPrice.toFixed(2)}
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
					onClick={onCheckout}
					type='button'
				>
					Checkout
					<ArrowRight className='ml-2' />
				</Button>
			</div>
		</div>
	);
}
