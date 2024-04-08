import React, { ReactNode } from "react";
import { Card, Flex, Box } from "@radix-ui/themes";

interface SidebarProps {
  children?: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <nav className="z-50 w-full sm:w-auto fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen  sm:pb-16">
        <Card size="3" className="m-4 p-4 sm:m-8 sm:p-8 h-full">
          <Flex direction={{
            initial: 'row',
            xs: 'column', 
            // TODO match up radix and tailwind breakpoints
          }} className="sm:h-full sm:w-56">
            {'<TODO:Title>'}
            {'<TODO:Browse>'}
            {'<TODO:Connect>'}
            <Box style={{ flexGrow: 1 }} />
            {'<TODO:ThemeSwitcher>'}
          </Flex>
        </Card>
      </nav>
  );
}

export default Sidebar;
