# Ecommerce Management App
A modern, full-stack ecommerce management application built with Next.js, TypeScript, and React Query.

## Features
- **Product Listings**: Browse and search through a catalog of products
- **Product Details**: View comprehensive product information
- **Shopping Cart**: Add, remove, and update product quantities
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Using React Query for efficient data fetching and caching

## Tech Stack
### Frontend:
- [Next.js](https://nextjs.org/) for server-side rendering and static site generation
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [React Query](https://react-query.tanstack.com/) for data fetching and caching
- [TailwindCSS](https://tailwindcss.com/) for utility-first CSS styling
- [Shadcn UI](https://ui.shadcn.com/) for pre-built UI components

### State Management:
- Zustand for client-side state

## Getting Started

### Prerequisites
- Node.js 16.8+ and npm/yarn/bun installed

### Installation
Clone the repository:
```bash
git clone https://github.com/yourusername/ecommerce_mana.git
cd ecommerce_mana
```
Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

### Project Structure
```
├── public/           # Static assets
├── src/
│   ├── app/          # App router pages
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   ├── store/        # State management
│   └── types/        # TypeScript type definitions
└── ...config files
```

### Development
#### Key File Descriptions
- **providers.tsx**: Sets up React Query provider with configuration
- **page.tsx**: Product detail page with dynamic routing
- **product-card.tsx**: Reusable product card component
- **cart-store.ts**: Zustand store for cart management

### Deployment
This project can be deployed on Vercel, the platform from the creators of Next.js.