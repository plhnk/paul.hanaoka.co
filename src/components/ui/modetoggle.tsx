'use client';
import React, { useEffect, useState } from 'react';
import { WandSparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { install } from '@github/hotkey';
import { Label } from '@/components/ui/label';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ModeToggleProps {
  className?: string;
  collapsed?: boolean;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ collapsed, className }) => {
  const iconStyle = {
    size: 16,
    color: 'currentColor',
    strokeWidth: 2,
    className:
      'group:hover:text-accent/60 text-element/50 self-center group-hover:text-accent',
  };
  const modes = [
    { mode: 'dark', label: 'Dark', hotkey: 'd', icon: <Moon {...iconStyle} /> },
    {
      mode: 'light',
      label: 'Light',
      hotkey: 'l',
      icon: <Sun {...iconStyle} />,
    },
    {
      mode: 'system',
      label: 'Auto',
      hotkey: 'y',
      icon: <WandSparkles {...iconStyle} />,
    },
  ];

  // try resolving theme instead to solve theme not propogating / flashing?

  const { setTheme, resolvedTheme, systemTheme, theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [clientTheme, setClientTheme] = useState<string | undefined>();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setClientTheme(theme === 'system' ? resolvedTheme : theme);
    }
  }, [mounted, theme, resolvedTheme]);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-hotkey]');
    for (const el of elements) {
      install(el as HTMLElement, el.getAttribute('data-hotkey')!);
      el.addEventListener('hotkey-fire', (event) => {
        if (event.target) {
          (event.target as HTMLElement).focus();
          setTimeout(() => {
            (event.target as HTMLElement).focus();
          }, 500);
        }
      });
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn(`col-span-1`, className)}>
      <Label
        className="block sm:hidden uppercase text-xs tracking-widest text-text/50 font-semibold my-2 text-center"
        htmlFor="span"
      >
        Mode
      </Label>
      <div
        className={`bg-background p-0.5 flex flex-col sm:flex-row gap-0.5 justify-between items-center rounded-lg sm:h-11 ${
          collapsed && 'sm:flex-col sm:h-auto sm:gap-0.5'
        }`}
      >
        {modes.map((modes, index) => (
          <Button
            onClick={() => {
              setTheme(`${modes.mode}`);
            }}
            data-hotkey={modes.hotkey}
            className={`${
              clientTheme === modes.mode && 'bg-card '
            } first:gap-3 gap-2 w-11 sm:w-auto h-11 sm:h-10 px-2.5 ${collapsed && 'sm:w-10'}`}
            key={index}
          >
            {modes.icon}
            {!collapsed && (
              <span className="hidden sm:block">{modes.label}</span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ModeToggle;
