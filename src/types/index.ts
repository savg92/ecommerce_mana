
export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}

export interface CartItem extends Product {
	quantity: number;
}

export interface Category {
	id: number;
	name: string;
}

export interface ProductsPaginationProps {
	currentPage: number;
	totalPages: number;
	totalProducts: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export interface ProductsErrorProps {
  message: string;
}

export interface ActiveFiltersProps {
	query: string;
	selectedCategory: string | null;
}

export interface CartState {
	items: CartItem[];
	addItem: (product: Product) => void;
	removeItem: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	clearCart: () => void;
	getTotalItems: () => number;
	getTotalPrice: () => number;
}

export interface ProductCardProps {
	product: Product;
	onAddToCart?: (product: Product) => void;
}

export interface ProductGridProps {
	products: Product[];
	onAddToCart?: (product: Product) => void;
}

export interface CategoryFiltersProps {
	categories: string[];
	selectedCategory: string | null;
	onCategoryClick: (category: string) => void;
}

export interface ProvidersProps {
	children: React.ReactNode;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
}

export interface MobileCartItemsProps {
	items: CartItem[];
	imageErrors: Record<number, boolean>;
	onImageError: (itemId: number) => void;
	totalPrice: number;
}

export interface CartItemCardProps {
  item: CartItem;
  hasImageError: boolean;
  onImageError: (itemId: number) => void;
}

export interface QuantityControlProps {
	quantity: number;
	onQuantityChange: (newQuantity: number) => void;
	size?: 'sm' | 'default';
}

export interface DesktopCartTableProps {
	items: CartItem[];
	imageErrors: Record<number, boolean>;
	onImageError: (itemId: number) => void;
	totalPrice: number;
	onCheckout: () => void;
}

export interface RemoveItemDialogProps {
	itemId: number;
	isIcon?: boolean;
}

export interface CheckoutDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onCheckout: () => void;
}