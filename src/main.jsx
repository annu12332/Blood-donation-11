import { StrictMode, useEffect } from 'react' 
import { createRoot } from 'react-dom/client'
import './index.css'

import router from '../routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './provider/AuthProvider.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AOS from 'aos';
import 'aos/dist/aos.css';

const queryClient = new QueryClient()

const RootApp = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)