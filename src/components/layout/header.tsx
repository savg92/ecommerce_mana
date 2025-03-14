'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search } from 'lucide-react';
import useCartStore from '@/lib/store/cart-store';

const Header = (): React.ReactElement => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isMounted, setIsMounted] = useState<boolean>(false);

	// Use the store hook properly with a selector
	const totalItems = useCartStore((state) => state.getTotalItems());

	// Mark component as mounted after hydration
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Initialize search term from URL query parameter
	useEffect(() => {
		const query = searchParams.get('query');
		if (query) {
			setSearchTerm(query);
		}
	}, [searchParams]);

	// Handle search submission with proper type annotation
	const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		// Create a new URLSearchParams instance from the current searchParams
		const params = new URLSearchParams(searchParams.toString());

		// Set or update the 'query' parameter with the search term
		if (searchTerm) {
			params.set('query', searchTerm);
		} else {
			params.delete('query');
		}

		// Navigate to the products page with the updated search params
		router.push(`/products?${params.toString()}`);
	};

	const handleSearchInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		setSearchTerm(e.target.value);
	};

	return (
		<header className='bg-white border-b sticky top-0 z-40'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					{/* Logo */}
					<Link
						href='/products'
						className='text-2xl font-bold text-primary'
					>
						FakeStore
					</Link>

					{/* Search Bar */}
					<form
						onSubmit={handleSearch}
						className='flex-1 max-w-md mx-4'
					>
						<div className='relative'>
							<Input
								type='text'
								placeholder='Search products...'
								value={searchTerm}
								onChange={handleSearchInputChange}
								className='w-full pl-10'
							/>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
							<Button
								type='submit'
								variant='ghost'
								size='sm'
								className='absolute right-0 top-0 h-full'
							>
								Search
							</Button>
						</div>
					</form>

					{/* Navigation */}
					<nav className='flex items-center space-x-4'>
						<Link
							href='/products'
							className={`hover:text-primary ${
								pathname === '/products' ? 'text-primary font-medium' : ''
							}`}
						>
							Products
						</Link>
						<Link
							href='/cart'
							className='relative'
						>
							<ShoppingCart className='h-6 w-6' />
							{/* Only render cart badge when mounted to prevent hydration mismatch */}
							{isMounted && totalItems > 0 && (
								<span className='absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
									{totalItems}
								</span>
							)}
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
