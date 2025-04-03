import React, { useEffect } from 'react';
import useCart from '@/hooks/useCart';
import { CarritoItem } from '../types';

interface CartDrawerProps {
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.producto.price * item.cantidad,
    0
  );
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).id === 'cart-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="cart-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
      onClick={handleOutsideClick}
    >
      <div className="w-80 h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No hay productos en el carrito.
          </p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item: CarritoItem) => (
              <li
                key={item.producto.id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.producto.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cantidad: {item.cantidad}
                  </p>
                </div>
                <div>
                  <p>${(item.producto.price * item.cantidad).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.producto.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 border-t pt-4">
          <p className="flex justify-between">
            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Impuestos (16%):</span> <span>${impuestos.toFixed(2)}</span>
          </p>
          <p className="flex justify-between font-bold">
            <span>Total:</span> <span>${total.toFixed(2)}</span>
          </p>
          <button
            onClick={clearCart}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;