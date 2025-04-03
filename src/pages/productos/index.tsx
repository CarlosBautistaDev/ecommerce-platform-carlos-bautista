import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProductGrid from '../../components/ProductGrid';
import { fetchProducts } from '../../services/api';

const ProductosPage = () => {
  const [category, setCategory] = useState<string>('');
  const [page, setPage] = useState<number>(1); 
  const [limit, setLimit] = useState<number>(10);

  const {
    data,
    isLoading,
    isError,
  } = useQuery(['products', category, page, limit], () =>
    fetchProducts(category, page, limit)
  );

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1); 
  };

  if (isError) {
    return (
      <div className="text-red-500 dark:text-red-400">
        Error al cargar los productos.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-gray-800 dark:text-gray-200">
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <div className="mb-4 flex justify-between items-center">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1); 
          }}
          className="p-2 border rounded dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="">Todas las Categorías</option>
          <option value="electronics">Electrónica</option>
          <option value="jewelery">Joyería</option>
          <option value="men's clothing">Ropa de Hombre</option>
          <option value="women's clothing">Ropa de Mujer</option>
        </select>
        <select
          value={limit}
          onChange={handleLimitChange}
          className="p-2 border rounded dark:bg-gray-800 dark:text-gray-200"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
        </select>
      </div>
      <ProductGrid products={products} />
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-800 dark:text-gray-200">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductosPage;