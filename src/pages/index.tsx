import React from 'react';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/productos');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Bienvenido a nuestra tienda</h1>
    </div>
  );
};

export default Home;