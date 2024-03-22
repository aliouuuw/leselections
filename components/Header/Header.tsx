"use client"
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./modeToggle";
import Image from "next/image";
import icon from "../../app/icon.png";
import { Menu } from "./Menu";
import { MobileMenu } from "./mobileMenu";
import Link from "next/link";

export default function Header() {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrolling(currentPosition > scrollTop && currentPosition > 0);
    setScrollTop(currentPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTop]);

  return (
    <header className={`z-50 sticky top-0 left-0 bg-background/80 backdrop-blur-md px-8 py-2 md:px-16 flex justify-between items-center transition-transform duration-300 ${
      scrolling ? "-translate-y-full" : "translate-y-0"
    }`}>
      <div className="flex items-center min-[1023px]:hidden">
        <MobileMenu />
      </div>
      <Link href="/">
        <Image src={icon} width={80} alt="Les éléctions logo" />
      </Link>
      <div className="hidden min-[1023px]:block">
        <Menu />
      </div>
      <div className="hidden min-[1023px]:block">
        <ModeToggle />
      </div>
      <div className="flex items-center min-[1023px]:hidden">
        <ModeToggle />
      </div>
    </header>
  );
}
