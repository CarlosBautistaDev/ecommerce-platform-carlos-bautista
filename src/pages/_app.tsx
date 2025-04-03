import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/globals.css';
import { AuthProvider, useAuth } from '@/context/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, 
      cacheTime: 1000 * 60 * 10,
      retry: 3, 
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), 
    },
  },
});
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsInitialized(true);
    } else if (
      !user &&
      router.pathname !== '/login' &&
      router.pathname !== '/register'
    ) {
      router.push('/login'); 
    } else {
      setIsInitialized(true);
    }
  }, [user, router]);

  if (!isInitialized) {
    return <div>Cargando...</div>; 
  }

  return <>{children}</>;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AuthGuard>
          <Header />
          <Component {...pageProps} />
        </AuthGuard>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
