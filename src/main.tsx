import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './types/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient(); //QueryClient instance to avoid remounts in strict mode


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </Provider>
  </StrictMode>
);
