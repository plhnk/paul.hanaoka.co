import React, { ReactNode } from "react";
import { Card, Flex, Box } from "@radix-ui/themes";
import NavButton from "./ui/navbutton";
import {
  CircleUserRound,
  Layers,
  PenLine,
  Mail,
  Github,
  Twitter,
  WandSparkles,
  Moon,
  Sun,
  Terminal,
  Pizza,

} from "lucide-react";
import { Label } from "@/components/ui/label";

interface SidebarProps {
  children?: ReactNode;
  iconStyle?: object;
}

const iconStyle = {
  size: 16,
  color: "currentColor",
  strokeWidth: 2,
  className: "text-neutral-700 self-center mr-2 group-hover:text-neutral-400",
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <nav className="z-50 w-full sm:w-auto fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen  sm:pb-16">
      <Card size="3" className="m-4 p-4 sm:m-8 sm:p-4 h-full">
        <Flex
          direction={{
            initial: "row",
            xs: "column",
            // TODO match up radix and tailwind breakpoints
          }}
          className="sm:h-full sm:w-56 my-1 py-2"
        >
          <Label
            className="uppercase text-xs tracking-widest text-neutral-600 font-semibold ml-3  my-2"
            htmlFor="span"
          >
            Browse
          </Label>
          <NavButton
            icon={<CircleUserRound {...iconStyle} />}
            label={"About"}
            url={"/about"}
            hotkey={"a"}
          />
          <NavButton
            icon={<Layers {...iconStyle} />}
            label={"Portfolio"}
            url={"/portfolio"}
            hotkey={"p"}
          />
          <NavButton
            icon={<PenLine {...iconStyle} />}
            label={"Blog"}
            url={"/blog"}
            hotkey={"b"}
          />
          <Box className="m-2" />
          <Label
            className="uppercase text-xs tracking-widest text-neutral-600 font-semibold ml-3  my-2"
            htmlFor="span"
          >
            Connect
          </Label>
          <NavButton
            icon={<Mail {...iconStyle} />}
            label={"Email"}
            hotkey={"e"}
            textToCopy="paul@hanaoka.co"
          />
          <NavButton
            icon={<Github {...iconStyle} />}
            label={"GitHub"}
            url={"https://github.com/plhnk"}
            hotkey={"g"}
          />
          <NavButton
            icon={<Twitter {...iconStyle} />}
            label={"Twitter"}
            url={"https://twitter.com/plhnk"}
            hotkey={"t"}
          />

          <Box style={{ flexGrow: 1 }} />
          <Label
            className="uppercase text-xs tracking-widest text-neutral-600 font-semibold ml-3  my-2"
            htmlFor="span"
          >
            Theme
          </Label>
          <NavButton
            icon={<WandSparkles {...iconStyle} />}
            label={"System"}
            theme={"system"}
            hotkey={"s"}
          />
          <NavButton
            icon={<Moon {...iconStyle} />}
            label={"Dark"}
            theme={"dark"}
            hotkey={"d"}
          />
          <NavButton
            icon={<Sun {...iconStyle} />}
            label={"Light"}
            theme={"light"}
            hotkey={"l"}
          />
          <NavButton
            icon={<Pizza {...iconStyle} />}
            label={"Fun"}
            theme={"fun"}
            hotkey={"f"}
          />
          <NavButton
            icon={<Terminal {...iconStyle} />}
            label={"CLI"}
            theme={"business"}
            hotkey={"c"}
          />
        </Flex>
      </Card>
    </nav>
  );
};

export default Sidebar;
