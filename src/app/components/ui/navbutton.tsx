'use client';
import { useState, useEffect } from 'react';
import { install } from '@github/hotkey';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { NavButtonProps } from '../../utilities/types';

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  label,
  url,
  hotkey,
  textToCopy,
  theme,
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
      setShowMessage(true);
    }
  };

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-hotkey]');
    for (const el of elements) {
      install(el as HTMLElement, el.getAttribute('data-hotkey')!);
    }
  }, []);

  const ButtonStyles = {
    className:
      ' group w-full max-w-36 sm:max-w-full hover:bg-neutral-800 active:bg-neutral-700 focus:ring-1 ring-inset focus:ring-neutral-700 focus:bg-neutral-900 flex items-baseline my-0.5 p-2 px-3 align-baseline rounded-md text-neutral-300 hover:text-neutral-50',
  };

  const ButtonContent = (
    <button
      {...ButtonStyles}
      onClick={() => {
        handleCopy();
        handleTheme();
      }}
      data-hotkey={hotkey}
    >
      {icon}
      {label}
      <kbd
        key={hotkey}
        className="hidden sm:block text-neutral-400 bg-neutral-800 rounded ml-auto w-[2ch] uppercase font-mono text-xs"
        // TODO add popover for hotkey
      >
        {hotkey}
      </kbd>
    </button>
  );

  return <>{url ? <Link className='flex sm:block' href={url}>{ButtonContent}</Link> : ButtonContent}</>;
};

export default NavButton;
