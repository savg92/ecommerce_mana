'use client';

import { useState, useEffect } from 'react';
import useCartStore from '@/lib/store/cart-store';
import { toast } from 'sonner';
import CartLoading from '@/components/cart/cart-loading';
import EmptyCart from '@/components/cart/empty-cart';
import MobileCartItems from '@/components/cart/mobile-cart-items';
import DesktopCartTable from '@/components/cart/desktop-cart-table';
import CheckoutDialog from '@/components/cart/checkout-dialog';

export default function CartPage(): React.ReactElement {
  const { items, clearCart, getTotalPrice } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = (): void => {
    setIsCheckingOut(false);
    clearCart();
    toast.success('Order Placed Successfully. Thank you for your purchase!');
  };

  const handleImageError = (itemId: number): void => {
    setImageErrors((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  if (!isMounted) {
    return <CartLoading />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className='container mx-auto px-4 py-8 sm:py-12 md:py-16'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>Your Cart</h1>

      {/* Mobile view */}
      <MobileCartItems
        items={items} 
        imageErrors={imageErrors} 
        onImageError={handleImageError} 
        totalPrice={getTotalPrice()} 
      />

      {/* Desktop view */}
      <DesktopCartTable
        items={items} 
        imageErrors={imageErrors} 
        onImageError={handleImageError} 
        totalPrice={getTotalPrice()} 
        onCheckout={() => setIsCheckingOut(true)} 
      />

      {/* Checkout dialog */}
      <CheckoutDialog
        isOpen={isCheckingOut} 
        onOpenChange={setIsCheckingOut} 
        onCheckout={handleCheckout} 
      />
    </div>
  );
}