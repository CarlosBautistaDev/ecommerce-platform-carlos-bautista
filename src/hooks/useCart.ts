import { useState, useEffect } from 'react';
import { Producto, CarritoItem } from '../types';

const useCart = () => {
  const [cartItems, setCartItems] = useState<CarritoItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart)); 
      }
    } catch (error) {
      console.error('Error al cargar el carrito desde localStorage:', error);
      localStorage.removeItem('cart'); 
    } finally {
      setIsInitialized(true); 
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error al guardar el carrito en localStorage:', error);
      }
    }
  }, [cartItems, isInitialized]);

  const addToCart = (producto: Producto) => {
    const storedCart = localStorage.getItem('cart');
    let updatedCart: CarritoItem[] = [];

    if (storedCart) {
      updatedCart = JSON.parse(storedCart);
    }

    const existingItem = updatedCart.find((item) => item.producto.id === producto.id);

    if (existingItem) {
      updatedCart = updatedCart.map((item) =>
        item.producto.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      updatedCart.push({ producto, cantidad: 1 });
    }

    setCartItems(updatedCart); 
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  };

  const updateQuantity = (productId: number, cantidad: number) => {
    const storedCart = localStorage.getItem('cart');
    let updatedCart: CarritoItem[] = [];

    if (storedCart) {
      updatedCart = JSON.parse(storedCart);
    }

    updatedCart = updatedCart.map((item) =>
      item.producto.id === productId ? { ...item, cantidad } : item
    );

    setCartItems(updatedCart); 
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  };

  const removeFromCart = (productId: number) => {
    const storedCart = localStorage.getItem('cart');
    let updatedCart: CarritoItem[] = [];

    if (storedCart) {
      updatedCart = JSON.parse(storedCart);
    }

    updatedCart = updatedCart.filter((item) => item.producto.id !== productId);

    setCartItems(updatedCart); 
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]); 
    localStorage.removeItem('cart'); 
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};

export default useCart;