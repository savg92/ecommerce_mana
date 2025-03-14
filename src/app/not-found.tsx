'use client';

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchParamsWrapper() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const searchParams = useSearchParams();
	return null;
}

export default function NotFound(): React.ReactElement {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleGoBack = () => {
		router.back();
	};

	return (
		<div className='min-h-[70vh] flex flex-col items-center justify-center px-4 py-12'>
			<div className='max-w-md w-full text-center space-y-6'>
				<div className='mb-6 flex justify-center'>
					<div className='h-24 w-24 rounded-full bg-red-50 flex items-center justify-center'>
						<AlertCircle className='h-12 w-12 text-red-500' />
					</div>
				</div>

				<h1 className='text-4xl font-bold mb-2'>Page not found</h1>
				<p className='text-lg text-gray-600 mb-8'>
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>

				{isMounted && (
					<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
						<Button
							asChild
							variant='default'
							className='w-full sm:w-auto'
						>
							<Link href='/products'>
								<Home className='mr-2 h-4 w-4' />
								Browse Products
							</Link>
						</Button>
						<Button
							variant='outline'
							className='w-full sm:w-auto'
							onClick={handleGoBack}
						>
							<ArrowLeft className='mr-2 h-4 w-4' />
							Go Back
						</Button>
					</div>
				)}

				<div className='text-sm text-gray-500 mt-8'>
					Error code: 404 | Page not found
				</div>
			</div>

			<Suspense fallback={null}>
				<SearchParamsWrapper />
			</Suspense>
		</div>
	);
}
