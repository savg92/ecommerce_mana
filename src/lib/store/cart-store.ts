import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartState } from '@/types';

const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: (product: Product) => {
				set((state) => {
					const existingItem = state.items.find(
						(item) => item.id === product.id
					);

					if (existingItem) {
						return {
							items: state.items.map((item) =>
								item.id === product.id
									? { ...item, quantity: item.quantity + 1 }
									: item
							),
						};
					} else {
						return {
							items: [...state.items, { ...product, quantity: 1 }],
						};
					}
				});
			},

			removeItem: (productId: number) => {
				set((state) => ({
					items: state.items.filter((item) => item.id !== productId),
				}));
			},

			updateQuantity: (productId: number, quantity: number) => {
				set((state) => ({
					items: state.items.map((item) =>
						item.id === productId
							? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
							: item
					),
				}));
			},

			clearCart: () => {
				set({ items: [] });
			},

			getTotalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0);
			},

			getTotalPrice: () => {
				return get().items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
			},
		}),
		{
			name: 'cart-storage',
		}
	)
);

export default useCartStore;