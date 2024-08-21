import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface RecommendsProps {
  label: string;
  category: string;
  url?: string;
  tags?: string[];
  description?: string;
  icon?: string | ReactNode;
  image?: string;
  referralLink?: {
    url: string;
    cta: string;
    description: string;
  }[];
}
export interface NavButtonProps {
  icon?: ReactNode;
  label?: string | ReactNode;
  minimal?: boolean;
  hotkey?: string;
  isActive?: boolean;
  // options
  url?: string;
  textToCopy?: string;
  theme?: string;
  className?: string;
  collapsed?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface ImpactCardProps {
  className?: string;
  content: string;
  extraInfo?: string;
  outcome?: 'positive' | 'negative' | 'neutral';
  importantNumber: number | string;
  numberType?: 'percentage' | 'integer';
  numberSuffix?: string;
  title: string;
  onClick?: () => void;
  icon?: React.ComponentType;
  iconClassName?: string;
}
export interface DashboardCardProps {
  className?: string;
  content?: ReactNode;
  extraInfo?: ReactNode;
  graphic?: ReactNode;
  graphicInfo?: string;
  importantNumber?: ReactNode;
  title?: string | ReactNode;
  fullScreen?: boolean;
  onClick?: () => void;
}
// Full Unsplash API response
export interface UnsplashPhoto {
  id: string;
  slug: string;
  alternative_slugs: {
    [key: string]: string;
  };
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: any[]; 
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[]; 
  sponsorship: null | any;
  topic_submissions: {
    [topic: string]: {
      status: string;
    };
  };
  asset_type: string;
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string;
    portfolio_url: string;
    bio: string;
    location: string;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    total_illustrations: number;
    total_promoted_illustrations: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string;
      portfolio_url: string;
      twitter_username: string;
      paypal_email: null | string;
    };
  };
}
