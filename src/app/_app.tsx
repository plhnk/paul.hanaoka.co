import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from './layout';
import * as Fathom from 'fathom-client';

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load('ERQBAFPH', {
        includedDomains: ['paul.hanaoka.co'],
      });

      function onRouteChangeComplete() {
        Fathom.trackPageview();
      }
      // Record a pageview when route changes
      router.events.on('routeChangeComplete', onRouteChangeComplete);

      // Unassign event listener
      return () => {
        router.events.off('routeChangeComplete', onRouteChangeComplete);
      };
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
