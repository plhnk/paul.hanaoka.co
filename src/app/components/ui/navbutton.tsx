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
    // TODO Sonner when text is copied
  };

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-hotkey]');
    for (const el of elements) {
      install(el as HTMLElement, el.getAttribute('data-hotkey')!);
    }
    // TODO set class when hotkey is pressed
  }, []);

  const ButtonStyles = {
    className:
      ' group w-full hover:bg-accent/10 active:bg-accent/20 focus:bg-accent/10 focus:ring-1 ring-inset focus:ring-accent/30 focus:bg-accent/05 flex items-baseline my-0.5 p-2 px-3 align-baseline rounded-md text-text hover:text-text',
      // TODO add styles for when hotkey is pressed
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
        className="hidden sm:block text-text/60 bg-element/10 group-hover:bg-accent/20 group-hover:text-accent/60 rounded ml-auto w-[2ch] uppercase font-mono text-xs"
        // TODO add popover for hotkey
      >
        {hotkey}
      </kbd>
    </button>
  );
// TODO skip focus on button if there's a link (redundant tabbing)
  return <>{url ? <Link className='flex sm:block' href={url}>{ButtonContent}</Link> : ButtonContent}</>;
};

export default NavButton;
