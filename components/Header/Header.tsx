import React from "react";
import { ModeToggle } from "../modeToggle";
import Image from "next/image";
import icon from "../../app/icon.png";
import { Menu } from "./Menu";
import { MobileMenu } from "../mobileMenu";

export default function Header() {
  return (
    <header className="p-2 flex justify-between h-fit items-center border-b border-secondary mb-2">
      <div className="flex items-center min-[1218px]:hidden">
        <MobileMenu />
      </div>
        <Image src={icon} width={80} alt="Les éléctions logo" />
      <div className="hidden min-[1218px]:block">
        <Menu />
      </div>
      <div className="hidden min-[1218px]:block">
        <ModeToggle />
      </div>
      <div className="flex items-center min-[1218px]:hidden">
        <ModeToggle />
      </div>
    </header>
  );
}
