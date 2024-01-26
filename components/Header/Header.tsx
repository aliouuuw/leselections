import React from "react";
import { ModeToggle } from "../modeToggle";
import Image from "next/image";
import icon from "../../app/icon.png";
import { Menu } from "./Menu";
import { MobileMenu } from "../mobileMenu";

export default function Header() {
  return (
    <header className="flex justify-between items-center h-fit">
      <div className="flex items-center">
        <Image src={icon} width={80} alt="Les éléctions logo" />
      </div>
      <div className="hidden md:block">
        <Menu />
      </div>
      <div className="hidden md:block">
        <ModeToggle />
      </div>
      <div className="flex items-center md:hidden">
        <ModeToggle />
        <MobileMenu />
      </div>
    </header>
  );
}
