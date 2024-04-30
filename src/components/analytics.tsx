'use client';
import { useEffect } from 'react';
import Router from 'next/router';
import * as Fathom from 'fathom-client';

export default function Analytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load('ERQBAFPH', {
        includedDomains: ['paul.hanaoka.co'],
      });

      function onRouteChangeComplete() {
        Fathom.trackPageview();
      }
      // Record a pageview when route changes
      Router.events.on('routeChangeComplete', onRouteChangeComplete);

      // Unassign event listener
      return () => {
        Router.events.off('routeChangeComplete', onRouteChangeComplete);
      };
    }
  }, []);
  return null;
}
