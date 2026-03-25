'use client';
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      enableSystem
      defaultTheme="dark"
      attribute="class"
      disableTransitionOnChange
      {...props}
      themes={['light', 'dark', 'elite', 'exec']}
    >
      {children}
    </NextThemesProvider>
  );
}
