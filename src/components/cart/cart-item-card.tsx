import { CartItemCardProps } from '@/types';
import Image from 'next/image';
import useCartStore from '@/lib/store/cart-store';
import QuantityControl from './quantity-control';
import RemoveItemDialog from './remove-item-dialog';


export default function CartItemCard({
  item,
  hasImageError,
  onImageError
}: CartItemCardProps): React.ReactElement {
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
    <div className='border rounded-lg p-4 bg-white'>
      <div className='flex items-center mb-3'>
        <div className='relative h-16 w-14 mr-3 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden'>
          {item.image && !hasImageError ? (
            <Image
              src={item.image}
              alt={item.title || 'Product image'}
              width={36}
              height={36}
              className='object-contain max-h-12 max-w-12'
              onError={() => onImageError(item.id)}
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
        <QuantityControl
          quantity={item.quantity} 
          onQuantityChange={(newQty) => handleQuantityChange(item.id, newQty)} 
        />
      </div>

      <div className='flex justify-between items-center mb-3'>
        <span className='text-sm'>Subtotal:</span>
        <span className='font-bold'>
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>

      <div className='flex justify-end'>
        <RemoveItemDialog itemId={item.id} />
      </div>
    </div>
  );
}