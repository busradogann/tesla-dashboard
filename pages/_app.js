import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import '../src/app/globals.css';

function MyApp({ Component, pageProps }) {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
