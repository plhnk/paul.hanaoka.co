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

export interface DashboardCardProps {
  className?: string;
  content?: ReactNode;
  extraInfo?: string;
  graphic?: string;
  graphicInfo?: string;
  importantNumber?: string;
  title?: string;
  fullScreen?: boolean;
}
