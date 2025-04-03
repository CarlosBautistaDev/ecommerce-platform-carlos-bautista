import React, { memo } from 'react';
import { Producto } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Producto[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="text-gray-800 dark:text-gray-200">No hay productos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default memo(ProductGrid);