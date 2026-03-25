'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as Fathom from 'fathom-client';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    Fathom.load('ERQBAFPH', {
      includedDomains: ['paul.hanaoka.co'],
    });
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    Fathom.trackPageview();
  }, [pathname]);

  return null;
}
