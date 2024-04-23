'use client';
import React, { useEffect, useState } from 'react';
import { WandSparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { install } from '@github/hotkey';
import { Label } from '@/components/ui/label';

interface ModeToggleProps {
  className?: string;
}

const iconStyle = {
  size: 16,
  color: 'currentColor',
  strokeWidth: 2,
  className:
    'group:hover:text-accent/60 text-element/50 self-center mr-0 sm:mr-1  group-hover:text-accent',
};

const ModeToggle: React.FC<ModeToggleProps> = () => {
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
      hotkey: 's',
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
    <div className="px-0 col-span-1 flex mr-1 sm:mr-0 justify-start sm:justify-between items-center sm:items-start rounded-md flex-col sm:flex-row h-full">
      <Label
        className="sm:hidden uppercase text-xs tracking-widest text-text/50 font-semibold mt-1.5 mb-2"
        htmlFor="span"
      >
        Mode
      </Label>
      {modes.map((modes, index) => (
        <button
          onClick={() => {
            setTheme(`${modes.mode}`);
          }}
          data-hotkey={modes.hotkey}
          className={
            `${theme === modes.mode ? 'bg-background ' : ' '}` +
            `${
              theme === 'light'
                ? 'sm:first:rounded-r-0 sm:last:rounded-r-0 '
                : ''
            }` +
            'group flex flex-col sm:flex-row align-center sm:justify-center p-4 sm:pr-2 sm:px-2 sm:py-1 w-full rounded-md sm:[&:nth-child(2)]:rounded-l-md sm:last:rounded-r-md hover:bg-accent/10 hover:text-text sm:rounded-[unset]'
          }
          key={index}
        >
          {modes.icon}
          <span className="hidden sm:block">{modes.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ModeToggle;
// create Button component and merge modetoggle and navbutton into it
// actually make this completely diff on mobile --> sidenav w/icon and initial only? or sideways letters? TODO
