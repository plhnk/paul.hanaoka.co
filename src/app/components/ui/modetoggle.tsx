'use client';
import React, { useState, useEffect } from 'react';
import { WandSparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ModeToggleProps {
  className?: string;
  //   mode?: string;
  //   theme?: string;
}

const iconStyle = {
  size: 16,
  color: 'currentColor',
  strokeWidth: 2,
  className: 'text-element/50 self-center mr-1 group-hover:text-accent',
};
const ModeToggle: React.FC<ModeToggleProps> = ({ className }) => {
  const modes = [
    { mode: 'dark', label: 'Dark', icon: <Moon {...iconStyle} /> },
    { mode: 'light', label: 'Light', icon: <Sun {...iconStyle} /> },
    { mode: 'system', label: 'Auto', icon: <WandSparkles {...iconStyle} /> },
  ];
  const { setTheme, resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="flex justify-between bg-text/10 rounded-md border-text/10 border-2">
      {modes.map((modes, index) => (
        <button
          onClick={() => {
            setTheme(`${modes.mode}`);
          }}
          className={
            `${resolvedTheme === modes.mode ? 'bg-text/10 ' : ''}` +
            'flex px-2 py-1 rounded-sm'
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
