import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AlignJustify, BookOpen } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <AlignJustify className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Mobile Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-5">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Actualités Électorales
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link href={"/#la_une"}>
                  <DropdownMenuItem>À la une</DropdownMenuItem>
                </Link>
                <Link href={"/filactu"}>
                  <DropdownMenuItem>Fil d&apos;Actualité</DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub></DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Candidats</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link href={"/candidats"}>
                  <DropdownMenuItem>Profils des Candidats</DropdownMenuItem>
                </Link>
                <Link href={"/candidats/analyses"}>
                  <DropdownMenuItem>Analyse des Politques</DropdownMenuItem>
                </Link>
                <Link href={"/candidats/debats"}>
                  <DropdownMenuItem>Débats et Opinions</DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{`Guide de l'Électeur`}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link href={"/guide/infos"}>
                  <DropdownMenuItem>Comment et Où voter?</DropdownMenuItem>
                </Link>
                <Link href={"/guide/docs"}>
                  <DropdownMenuItem>Documents Nécessaires</DropdownMenuItem>
                </Link>
                <Link href={"/guide/histoire"}>
                  <DropdownMenuItem>Histoire des Élections</DropdownMenuItem>
                </Link>
                <Link href={"/guide/factcheck"}>
                  <DropdownMenuItem>Fact-checking</DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
              <DropdownMenuSubTrigger>Multimédia</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link href={"/podcasts"}>
                  <DropdownMenuItem>Podcasts</DropdownMenuItem>
                </Link>
                <Link href={"/videos_images"}>
                  <DropdownMenuItem>Vidéos et Images</DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <Link href={"/lettres"}>
            <DropdownMenuItem>Lettres de Élécteurs</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/magazine"}>
            <DropdownMenuItem className="gap-2"><BookOpen className="h-4 w-4" /> Magazine</DropdownMenuItem>
          </Link>

        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
