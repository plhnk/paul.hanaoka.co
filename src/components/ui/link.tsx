import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<LinkProps> = ({ href, children, className }) => {
  const isExternal = href.startsWith('http');

  return (
    <Link
      rel="noopener"
      href={href}
      className={cn(className, isExternal && 'group')}
    >
      {children}
      {isExternal && (
        <ArrowUpRight
          className="inline align-top opacity-10 group-hover:opacity-100 ml-.5 transition-transform translate-x-0 translate-y-0  group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:transition-transform ease-in-out duration-200"
          size={16}
        />
      )}
    </Link>
  );
};

export default CustomLink;
