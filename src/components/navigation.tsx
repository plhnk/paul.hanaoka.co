'use client';
import Sidebar from './sidebar';
import MobileMenu from './ui/mobilemenu';

interface NavigationProps {
  collapsed?: boolean;
  toggleCollapse?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ collapsed, toggleCollapse }) => {
  return (
    <>
      <Sidebar
        className="hidden sm:block"
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
      />
      <MobileMenu />
    </>
  );
};

export default Navigation;
