import { MobileCartItemsProps } from "@/types";
import CartItemCard from "./cart-item-card";

export default function MobileCartItems({
	items,
	imageErrors,
	onImageError,
	totalPrice,
}: MobileCartItemsProps): React.ReactElement {
	return (
		<div className='block md:hidden space-y-4'>
			{items.map((item) => (
				<CartItemCard
					key={item.id}
					item={item}
					hasImageError={!!imageErrors[item.id]}
					onImageError={onImageError}
				/>
			))}

			<div className='border-t border-b py-4 my-4'>
				<div className='flex justify-between items-center'>
					<span className='font-bold'>Total:</span>
					<span className='font-bold text-xl'>${totalPrice.toFixed(2)}</span>
				</div>
			</div>
		</div>
	);
}
