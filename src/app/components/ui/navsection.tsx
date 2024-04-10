import React from 'react';
import { Label } from '@/components/ui/label';
import NavButton from './navbutton';
import { NavButtonProps } from '../../utilities/types';

interface NavSectionProps {
  label: string;
  buttons: NavButtonProps[];
}

const NavSection: React.FC<NavSectionProps> = ({ label, buttons }) => {
  return (
    <>
      <Label
        className="uppercase text-xs tracking-widest text-neutral-600 font-semibold ml-3 my-2"
        htmlFor="span"
      >
        {label}
      </Label>
      {buttons.map((button, index) => (
        <NavButton
          key={index}
          icon={button.icon}
          label={button.label}
          hotkey={button.hotkey}
          url={button.url}
          textToCopy={button.textToCopy}
          theme={button.theme}
        />
      ))}
    </>
  );
};

export default NavSection;
