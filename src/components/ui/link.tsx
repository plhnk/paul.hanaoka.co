import React from 'react';
import NextLink from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, className, ...props }) => {
  const isExternal = href.startsWith('http');

  return (
    <NextLink
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      href={href}
      className={cn(className, isExternal && 'group')}
      {...props}
    >
      {children}
      {isExternal && (
        <ArrowUpRight
          className="inline align-top opacity-10 group-hover:opacity-100 ml-.5 transition-transform translate-x-0 translate-y-0  group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:transition-transform ease-in-out duration-200"
          size={16}
        />
      )}
    </NextLink>
  );
};

export default CustomLink;