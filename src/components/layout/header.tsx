'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, X } from 'lucide-react';
import useCartStore from '@/lib/store/cart-store';

const Header = (): React.ReactElement => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isMounted, setIsMounted] = useState<boolean>(false);

	const totalItems = useCartStore((state) => state.getTotalItems());

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const query = searchParams.get('query');
		setSearchTerm(query || '');
	}, [searchParams]);

	const handleSearch = useCallback(
		(e: React.FormEvent<HTMLFormElement>): void => {
			e.preventDefault();

			const params = new URLSearchParams();

			if (searchTerm.trim()) {
				params.set('query', searchTerm.trim());
			}

			router.push(`/products?${params.toString()}`);
		},
		[router, searchTerm]
	);

	const handleSearchInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>): void => {
			setSearchTerm(e.target.value);
		},
		[]
	);

	const handleClearSearch = useCallback((): void => {
		setSearchTerm('');

		if (pathname === '/products' && searchParams.has('query')) {
			const params = new URLSearchParams(searchParams.toString());
			params.delete('query');
			router.push(`/products?${params.toString()}`);
		}
	}, [pathname, router, searchParams]);

	return (
		<header className='bg-white border-b sticky top-0 z-40'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
					{/* Logo */}
					<Link
						href='/products'
						className='text-2xl font-bold text-primary'
					>
						<div className='flex items-center space-x-4'>
							{/* Logo Icon */}
							<svg
								className='h-8 w-8 text-primary'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M12 2L2 7l10 5 10-5-10-5z' />
								<path d='M2 17l10 5 10-5-10-5-10 5z' />
								<path d='M2 12l10 5 10-5-10-5-10 5z' />
							</svg>
							{/* Logo Text */}
							<div className='flex flex-col'>
								<span className=''>Off shore</span>
								<span className=''>Clothing</span>
							</div>
						</div>
					</Link>

					{/* Search Bar */}
					<form
						onSubmit={handleSearch}
						className='w-full sm:flex-1 sm:max-w-md mx-4'
						role='search'
					>
						<div className='relative'>
							{searchTerm && (
								<div className='absolute left-0 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0'>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='h-8 w-8 p-0'
										onClick={handleClearSearch}
										aria-label='Clear search'
									>
										<X className='h-4 w-4 text-gray-400' />
									</Button>
								</div>
							)}
							{!searchTerm && (
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
							)}
							<Input
								type='text'
								placeholder='Search products...'
								value={searchTerm}
								onChange={handleSearchInputChange}
								className='w-full pl-10 pr-20' // Added right padding for both buttons
								name='query'
								aria-label='Search products'
							/>
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
							aria-label='View cart'
						>
							<ShoppingCart className='h-6 w-6' />
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
