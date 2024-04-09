"use client";
import { ReactNode, useState, useEffect } from "react";
import { install } from "@github/hotkey";

interface NavButtonProps {
  icon: ReactNode;
  label: string;
  hotkey: string;
  url?: string;
  textToCopy?: string; // Add a new prop for the text to copy
}

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  label,
  url,
  hotkey,
  textToCopy,
}) => {
  const handleCopy = () => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setShowMessage(true);
    }
  };

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-hotkey]");
    for (const el of elements) {
      install(el as HTMLElement, el.getAttribute("data-hotkey")!);
    }
  }, []);
  console.log({ showMessage });
  return (
    <button
      className="group hover:bg-neutral-800 active:bg-neutral-700 focus:ring-1 ring-inset focus:ring-neutral-700 focus:bg-neutral-900 flex items-baseline my-0.5 p-2 px-3 align-baseline rounded-md text-neutral-300 hover:text-neutral-50"
      onClick={handleCopy} // Add onClick event handler
      data-hotkey={hotkey}
    >
      {icon}
      {label}
      <kbd
        key={hotkey}
        className="text-neutral-400 bg-neutral-800 rounded ml-auto w-[2ch] uppercase font-mono text-xs"
      >
        {hotkey}
      </kbd>
    </button>
  );
};

export default NavButton;
