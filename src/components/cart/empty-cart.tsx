import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export default function EmptyCart(): React.ReactElement {
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