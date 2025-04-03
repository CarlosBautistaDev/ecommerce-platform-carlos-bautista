import useFavorites from '@/hooks/useFavorites';
import ProductCard from '@/components/ProductCard';

const FavoritosPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites(); 


  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <p className="text-lg">No tienes productos favoritos.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRemove={() => removeFavorite(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritosPage;