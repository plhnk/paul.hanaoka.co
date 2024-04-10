import { ReactNode } from 'react';

export interface NavButtonProps {
  icon: ReactNode;
  label: string;
  hotkey: string;
  // options
  url?: string;
  textToCopy?: string;
  theme?: string;
}
