'use client';
// import { useEffect } from 'react';
// import { install } from '@github/hotkey';
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
import { Button } from './button';

const NavButton: React.FC<NavButtonProps> = ({
  minimal,
  icon,
  label,
  url,
  isActive,
  hotkey,
  textToCopy,
  theme,
  className,
  collapsed,
  onClick,
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

  // useEffect(() => {
  //   const elements = document.querySelectorAll('[data-hotkey]');
  //   for (const el of elements) {
  //     install(el as HTMLElement, el.getAttribute('data-hotkey')!);
  //   }
  // }, [onClick]);

  const ButtonStyles = {
    className: cn(
      `rounded-lg w-full justify-start ${
        collapsed && 'w-11 p-3 justify-center'
      }`,
      className
    ),
  };

  const IconStyles = {
    size: 16,
    color: 'currentColor',
    strokeWidth: 2,
    className:
      'text-element/30 self-center group-hover:text-text/80 group-focus-visible:text-text/60',
  };

  const Hotkey = (
    <kbd
      key={hotkey}
      className="hidden group-focus-visible:text-text/60 group-focus-visible:bg-accent/20 focus:bg-accent sm:block text-text/60 bg-element/10 group-hover:bg-accent/20 group-hover:text-accent/90 rounded ml-auto w-[2ch] uppercase font-mono text-xs text-center"
    >
      {hotkey}
    </kbd>
  );

  const ButtonContent = (
    <>
      {!minimal && icon}
      {!collapsed && (
        <>
          {label}
          {textToCopy ? <Copy {...IconStyles} /> : null}
          {url && !url.startsWith('/') ? (
            <ArrowUpRight {...IconStyles} />
          ) : null}
          {!minimal && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>{Hotkey}</TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={32}
                  // align="end"
                  align="center"
                  // alignOffset={20}
                  className="text-text/80 bg-element/10 rounded-md w-auto"
                >
                  Press ‘{hotkey && hotkey.toUpperCase()}’ for {label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </>
      )}
    </>
  );
  const buttonProps = url && { asChild: true };
  const handleClick = () => {
    handleCopy();
    handleTheme();
    if (onClick) onClick();
  };

  const ButtonElement = (
    <Button
      {...buttonProps}
      {...ButtonStyles}
      onClick={handleClick}
      data-hotkey={hotkey}
      {...props}
    >
      {url ? <Link href={url}>{ButtonContent}</Link> : ButtonContent}
    </Button>
  );

  return collapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{ButtonElement}</TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={16}
          // align="start"
          align="center"
          // alignOffset={-32}
          className="text-text/80 bg-element/10 rounded-md w-auto flex gap-4 items-center"
        >
          {label} {Hotkey}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    ButtonElement
  );
};

export default NavButton;
