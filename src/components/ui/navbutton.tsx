'use client';
import { useEffect } from 'react';
import { install } from '@github/hotkey';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { NavButtonProps } from '../../lib/utilities/types';
import { toast } from 'sonner';
import { Copy, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  label,
  url,
  hotkey,
  textToCopy,
  theme,
  className,
  collapsed,
  ...props
}) => {
  const { setTheme } = useTheme();

  const handleTheme = () => {
    if (theme) {
      setTheme(theme);
    }
  };
  const handleCopy = () => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      copyToast();
    }
  };

  const copyToast = () => {
    toast.success('Email copied to clipboard!', {
      action: {
        label: 'Open Mail Client',
        onClick: () => (window.location.href = 'mailto:' + textToCopy),
      },
    });
  };

  useEffect(() => {
    const elements = document.querySelectorAll('[data-hotkey]');
    for (const el of elements) {
      install(el as HTMLElement, el.getAttribute('data-hotkey')!);
    }
  }, []);

  const ButtonStyles = {
    className: cn(
      ` group w-full focus-visible:outline-none focus-visible:shadow-focus hover:bg-accent/10 active:bg-accent/20 focus:bg-accent/10 focus:ring-1 ring-inset focus:ring-accent/30 focus:bg-accent/05 flex items-baseline mb-0.5 p-2 px-3 align-baseline rounded-md text-text hover:text-text ${
        collapsed && 'p-3 mb-1'
      }`,
      className
    ),
  };

  const IconStyles = {
    size: 16,
    color: 'currentColor',
    strokeWidth: 2,
    className:
      'text-element/30 self-center ml-2 group-hover:text-text/80 group-focus-visible:text-text/60',
  };

  const ButtonContent = (
    <>
      {icon}
      {!collapsed && (
        <>
          {label}
          {textToCopy ? <Copy {...IconStyles} /> : null}
          {url && !url.startsWith('/') ? (
            <ArrowUpRight {...IconStyles} />
          ) : null}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <kbd
                  key={hotkey}
                  className="hidden group-focus-visible:text-text/60 group-focus-visible:bg-accent/20 focus:bg-accent sm:block text-text/60 bg-element/10 group-hover:bg-accent/20 group-hover:text-accent/90 rounded ml-auto w-[2ch] uppercase font-mono text-xs text-center"
                >
                  {hotkey}
                </kbd>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                align="end"
                alignOffset={20}
                className="text-text/80 bg-element/10 rounded-md w-auto"
              >
                Press ‘{hotkey && hotkey.toUpperCase()}’ for {label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>{' '}
        </>
      )}
    </>
  );
  return (
    <>
      {url ? (
        <Link
          {...ButtonStyles}
          onClick={() => {
            handleCopy();
            handleTheme();
          }}
          data-hotkey={hotkey}
          href={url}
        >
          {ButtonContent}
        </Link>
      ) : (
        <button
          {...ButtonStyles}
          onClick={() => {
            handleCopy();
            handleTheme();
          }}
          data-hotkey={hotkey}
          {...props}
        >
          {ButtonContent}
        </button>
      )}
    </>
  );
};

export default NavButton;
