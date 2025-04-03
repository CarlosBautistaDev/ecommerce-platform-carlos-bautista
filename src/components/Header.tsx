import Link from 'next/link';
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import useCart from '@/hooks/useCart';
import { FaBars, FaShoppingCart, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 bg-opacity-60 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center h-full px-4">
          {/* Logotipo */}
          <Link href="/productos">
            <button className="text-2xl font-bold text-primary dark:text-primary-light">
              E-commerce
            </button>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-800 dark:text-gray-200 text-2xl focus:outline-none"
          >
            {isMenuOpen ? (
              <span>
                <FaTimes aria-hidden="true" />
              </span>
            ) : (
              <span>
                <FaBars aria-hidden="true" />
              </span>
            )}
          </button>

          <nav
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } absolute top-16 left-0 w-full bg-white dark:bg-gray-900 lg:static lg:flex lg:items-center lg:space-x-6 lg:w-auto lg:bg-transparent lg:dark:bg-transparent`}
          >
            {user ? (
              <>
                <ThemeToggle />
                <Link
                  href="/productos"
                  className="block px-4 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition lg:inline"
                >
                  Productos
                </Link>
                <Link
                  href="/favoritos"
                  className="block px-4 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition lg:inline"
                >
                  Favoritos
                </Link>
                <Link
                  href="/mi-cuenta"
                  className="block px-4 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition lg:inline"
                >
                  Mi Cuenta
                </Link>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative block px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full transition lg:inline"
                >
                  <FaShoppingCart className="text-xl" />
                </button>
                <button
                  onClick={logout}
                  className="block px-4 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition lg:inline"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition lg:inline"
              >
                Iniciar Sesión
              </Link>
            )}
          </nav>
        </div>
      </header>

      <div className="h-16"></div>

      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Header;
