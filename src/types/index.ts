
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