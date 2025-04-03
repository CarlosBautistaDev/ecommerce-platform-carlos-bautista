import React from 'react';
import { Producto } from '../types';
import useCart from '../hooks/useCart';
import useFavorites from '../hooks/useFavorites';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface ProductCardProps {
  product: Producto;
  onRemove?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove }) => {
  const { addToCart } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = () => {
    if (onRemove) {
      onRemove();
    } else {
      if (favorite) {
        removeFavorite(product.id);
      } else {
        addFavorite(product);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="relative border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Imagen del Producto */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md"
      />

      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 text-red-500 dark:text-red-400"
        aria-label={favorite ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
      >
        {favorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </button>
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-700 dark:text-gray-400 mt-1">
        ${product.price.toFixed(2)}
      </p>
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
      >
        Añadir al Carrito
      </button>
      <Link href={`/productos/${product.id}`}>
        <button className="mt-2 w-full bg-gray-500 dark:bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 dark:hover:bg-gray-800 transition-colors duration-300">
          Ver Detalle
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
