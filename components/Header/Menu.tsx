"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";


export function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Actualités Électorales</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid p-4 md:w-[300px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="À la une" />
              <ListItem href="/docs" title="Fil d&apos;Actualité" />              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Candidats</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid p-4 md:w-[300px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Profils des Candidats"/>
              <ListItem href="/docs" title="Analyse des Politiques"/>
              <ListItem href="/docs" title="Débats et Opinions"/>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{`Guide de l'Électeur`}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid p-4 md:w-[300px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Comment et Où Voter?"/>
              <ListItem href="/docs" title="Documents Nécessaires"/>
              <ListItem href="/docs" title="Histoire des Élections"/>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Perspectives Éditoriales</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid p-4 md:w-[300px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Éditorial de la Rédaction"/>
              <ListItem href="/docs" title="Lettres des Lecteurs"/>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Multimédia</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid p-4 md:w-[300px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Reportages"/>
              <ListItem href="/docs" title="Podcasts"/>
              <ListItem href="/docs" title="Vidéos et Images"/>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              International
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Fact-checking
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
