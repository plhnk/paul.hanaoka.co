import React, { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const MobileMenu: React.FC = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleDrawer = () => {
  //     setIsOpen(!isOpen);
  // };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className='block sm:hidden'>Menu</button>
      </DrawerTrigger>
      <DrawerContent className='m-4 p-4'>
        {/* <div className="mx-auto w-full max-w-sm"> */}
          menu?
          <DrawerFooter>
            <DrawerClose asChild>
              <button>Close</button>
            </DrawerClose>
          </DrawerFooter>
        {/* </div> */}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
