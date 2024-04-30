import { ReactNode } from 'react';

export interface NavButtonProps {
  icon: ReactNode;
  label: string | ReactNode;
  hotkey: string;
  // options
  url?: string;
  textToCopy?: string;
  theme?: string;
  className?: string;
}

export interface DashboardCardProps {
  className?: string;
  content?: ReactNode;
  extraInfo?: ReactNode;
  graphic?: ReactNode;
  graphicInfo?: string;
  importantNumber?: ReactNode;
  title?: string;
  fullScreen?: boolean;
  onClick?: () => void;
}

export interface UnsplashPhoto {
  id: string;
  altDescription: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
    profileImage: {
      small: string;
      medium: string;
      large: string;
    };
  };
  likes: number;
  downloads: number;
  views: number;
  tags: {
    title: string;
  }[];
}