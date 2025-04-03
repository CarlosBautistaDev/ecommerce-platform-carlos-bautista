import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById, fetchProducts } from '../../services/api';
import { Producto } from '../../types';
import useCart from '@/hooks/useCart';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useQuery<Producto>(
    ['producto', id],
    () => fetchProductById(Number(id)),
    { enabled: !!id }
  );

  const { data: relatedProducts } = useQuery<Producto[]>(
    ['productosRelacionados', product?.category],
    async () => {
      const response = await fetchProducts(product?.category || '', 1, 10); // Cambiar el orden de los argumentos
      return response.products;
    },
    { enabled: !!product?.category }
  );

  if (isLoading)
    return <p className="text-gray-800 dark:text-gray-200">Cargando producto...</p>;
  if (error)
    return <p className="text-red-500 dark:text-red-400">Error al cargar el producto</p>;

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold">{product?.title}</h1>
      <img
        src={product?.image}
        alt={product?.title}
        className="w-full max-w-md mx-auto mt-4 rounded-md shadow-md"
      />
      <p className="mt-4 text-gray-700 dark:text-gray-400">{product?.description}</p>
      <p className="mt-2 text-xl font-semibold">${product?.price}</p>
      <button
        onClick={() => product && addToCart(product)}
        className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
      >
        Añadir al Carrito
      </button>

      <h2 className="mt-6 text-lg font-semibold">Productos Relacionados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {relatedProducts?.map((relatedProduct) => (
          <div
            key={relatedProduct.id}
            className="border p-4 rounded shadow bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <img
              src={relatedProduct.image}
              alt={relatedProduct.title}
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="text-sm font-bold mt-2">{relatedProduct.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">${relatedProduct.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;