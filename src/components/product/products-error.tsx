import { ProductsErrorProps } from '../../types/index';

export default function ProductsError({ message }: ProductsErrorProps): React.ReactElement {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Error Loading Products
      </h2>
      <p className="text-gray-700 mb-4">
        We encountered an error while loading the products. Please try again later.
      </p>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}