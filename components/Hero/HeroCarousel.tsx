import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";

// Array of objects containing carousel content
const carouselItems = [
  {
    imageSrc: "/macky.png",
    title: "Macky Sall réaffirme qu'il quittera ses fonctions le 2 avril",
    description:
      "Au Sénégal, alors que les conclusions du dialogue national l'incitent à prolonger son mandat jusqu'à la désignation de son successeur, en juin ou en juillet, le président a réitéré publiquement son intention de quitter le pouvoir à la date initialement annoncée.",
  },
  {
    imageSrc: "/projet2loi.png",
    title: "Au Sénégal, pourquoi le projet de loi d'amnistie divise pouvoir et opposition?",
    description:
      "Le texte, qui porte sur les faits liés aux manifestations politiques et survenus dans le pays entre 2021 et 2024, a été adopté, le 28 février, en Conseil des ministres. Mais il n'est pas du goût de tout le monde.",
  },
  {
    imageSrc: "/karim.png",
    title: "Au Sénégal, un dialogue pour sauver le candidat Karim Wade?",
    description:
      "Malgré la décision du Conseil constitutionnel qui enjoint le gouvernement d'organiser les élections présidentielles dans les meilleurs délais, le Parti démocratique sénégalais (PDS) et ses alliés s'activent pour faire reprendre l'ensemble du processus électoral.",
  },
];

export function HeroCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="h-[500px] object-center">
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} className="h-full">
            <div className="relative w-full h-full rounded-lg flex flex-col items-center">
              <div className="z-1 absolute top-0 left-0 rounded-lg w-full h-full">
                <Image
                  src={item.imageSrc}
                  alt="Image à la une"
                  fill
                  className="rounded-lg object-cover object-center"
                />
              </div>
              <div className="z-3 absolute bottom-0 left-0 h-fit md:w-1/2 rounded-tr-lg rounded-bl-lg bg-background/80 backdrop-blur-md p-4 flex flex-col gap-2">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <Button variant={"default"} className="w-28 self-end">
                  Lire plus
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
