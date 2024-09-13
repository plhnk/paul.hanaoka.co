'use client';
import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure the default theme is 'dark' before hydration
  if (!mounted) {
    return <div className="dark">{children}</div>; // Apply the default 'dark' theme during SSR
  }

  return (
    <NextThemesProvider
      enableSystem
      defaultTheme="dark"
      attribute="class"
      {...props}
      themes={['light', 'dark', 'elite', 'exec']}
      // add any new themes to this list, but also don't forget to add them to the tailwind config file
    >
      {children}
    </NextThemesProvider>
  );
}
