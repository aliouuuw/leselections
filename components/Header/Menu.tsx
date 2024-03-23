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
import { BookOpen } from "lucide-react";
import { Button } from "../ui/button";


export function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Actualités Électorales</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid p-4 md:w-[300px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/#la_une" title="À la une" />
              <ListItem href="/filactu" title="Fil d&apos;Actualité" />              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Candidats</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid p-4 md:w-[300px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/candidats" title="Profils des Candidats"/>
              <ListItem href="/candidats/analyses" title="Analyse des Politiques"/>
              <ListItem href="/candidats/debats" title="Débats et Opinions"/>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{`Guide de l'Électeur`}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid p-4 md:w-[300px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/guide/infos" title="Comment et Où Voter?"/>
              <ListItem href="/guide/docs" title="Documents Nécessaires"/>
              <ListItem href="/guide/histoire" title="Histoire des Élections"/>
              <ListItem href="/guide/factcheck" title="Fact-checking"/>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Multimédia</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid p-4 md:w-[300px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/podcasts" title="Podcasts"/>
              <ListItem href="/videos_images" title="Vidéos et Images"/>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/lettres" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Lettres des Élécteurs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/magazine" legacyBehavior passHref>
            <NavigationMenuLink className="group border gap-2 inline-flex h-8 xl:h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
             <BookOpen className="h-4 w-4" /> Magazine
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
