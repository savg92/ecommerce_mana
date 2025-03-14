export default function CartLoading(): React.ReactElement {
  return (
    <div className='container mx-auto px-4 py-8 sm:py-12 md:py-16'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>
        Your Cart
      </h1>
      <div className='animate-pulse'>
        <div className='h-10 bg-gray-200 rounded mb-4'></div>
        <div className='h-64 bg-gray-200 rounded mb-4'></div>
        <div className='h-10 bg-gray-200 rounded w-1/2'></div>
      </div>
    </div>
  );
}