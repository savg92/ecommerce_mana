import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Off Shore Clothing',
	description:
		'E-commerce application built with Next.js, React Query, and Shadcn UI',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					<div className='flex min-h-screen flex-col'>
						<Header />
						<main className='flex-1 container mx-auto px-4 py-8'>
							{children}
						</main>
						<Footer />
					</div>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
