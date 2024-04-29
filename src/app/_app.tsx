import { useEffect } from 'react';
import Layout from "./layout";
import * as Fathom from 'fathom-client';

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load('ERQBAFPH', {
        includedDomains: ['paul.hanaoka.co']
      });
      Fathom.trackPageview();
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}