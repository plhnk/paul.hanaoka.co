import React from 'react';
import { Label } from '@/components/ui/label';
import NavButton from './navbutton';
import { NavButtonProps } from '../../lib/utilities/types';
import { cn } from '@/lib/utils';

interface NavSectionProps {
  label: string;
  buttons: NavButtonProps[];
  className?: string;
  collapsed?: boolean;
}

const NavSection: React.FC<NavSectionProps> = ({
  label,
  buttons,
  className,
  collapsed,
}) => {
  return (
    <div className={cn(`flex flex-col gap-0.5 ${collapsed && 'lg:gap-1'}`, className)}>
      {!collapsed && (
        <Label
          className="uppercase text-xs tracking-widest text-text/50 font-semibold ml-3 my-2"
          htmlFor="span"
        >
          {label}
        </Label>
      )}
      {buttons.map((button, index) => (
        <NavButton
          collapsed={button.collapsed}
          key={index}
          icon={button.icon}
          label={button.label}
          hotkey={button.hotkey}
          url={button.url}
          textToCopy={button.textToCopy}
          theme={button.theme}
        />
      ))}
    </div>
  );
};

export default NavSection;
