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
      hotkey: 'd',
      icon: <WandSparkles {...iconStyle} />,
    },
  ];
  const { setTheme, theme: initialTheme } = useTheme();
  const [theme, setClientTheme] = useState<string | undefined>();

  useEffect(() => {
    setClientTheme(initialTheme);
  }, [initialTheme]);

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

  return (
    <div className={cn(`col-span-1`, className)}>
      <Label
        className="sm:hidden uppercase text-xs tracking-widest text-text/50 font-semibold mt-1.5 mb-2"
        htmlFor="span"
      >
        Mode
      </Label>
      <div
        className={cn(
          `bg-background p-0.5 flex flex-col sm:flex-row gap-0.5 items-center rounded-md sm:rounded-lg sm:h-11 ${
            collapsed && 'sm:flex-col sm:h-auto sm:gap-0.5'
          }`,
          className
        )}
      >
        {modes.map((modes, index) => (
          <Button
            onClick={() => {
              setTheme(`${modes.mode}`);
            }}
            data-hotkey={modes.hotkey}
            className={`${theme === modes.mode && 'bg-card '} h-10 px-2.5 ${
              collapsed && 'w-10'
            }`}
            key={index}
          >
            {modes.icon}
            {!collapsed && (
              <span className="hidden sm:block mr-0.5">{modes.label}</span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ModeToggle;
// create Button component and merge modetoggle and button into it
// actually make this completely diff on mobile --> side w/icon and initial only? or sideways letters? TODO
