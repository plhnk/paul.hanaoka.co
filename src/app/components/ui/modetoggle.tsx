'use client';
import React, { useEffect, useState } from 'react';
import { WandSparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { install } from '@github/hotkey';

interface ModeToggleProps {
  className?: string;
}

const iconStyle = {
  size: 16,
  color: 'currentColor',
  strokeWidth: 2,
  className:
    'group:hover:text-accent/60 text-element/50 self-center mr-2 sm:mr-1  group-hover:text-accent',
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
  }, []);

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
    // TODO have style for current mode
    // TODO fix console error that comes from styling the toggle AFTER the button has been clicked (instead of based on w/e the current mode is)
  }, []);

  return (
    <div className="col-span-2 sm:col-span-1 flex justify-between rounded-md ">
      {modes.map((modes, index) => (
        <button
          onClick={() => {
            setTheme(`${modes.mode}`);
          }}
          data-hotkey={modes.hotkey}
          className={
            `${theme === modes.mode ? 'bg-background ' : ' '}` +
            `${
              theme === 'light' ? 'first:rounded-r-0 last:rounded-r-0 ' : ''
            }` +
            'group flex justify-center pr-5 sm:pr-2 px-2 py-1 w-full first:rounded-l-md last:rounded-r-md hover:bg-accent/10 hover:text-text'
          }
          key={index}
        >
          {modes.icon}
          {modes.label}
        </button>
      ))}
    </div>
  );
};

export default ModeToggle;
// create Button component and merge modetoggle and navbutton into it
