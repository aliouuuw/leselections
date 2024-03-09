import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import { sanityClient } from "@/sanity.cli";

const getLaUne = async () => {
  try {
    const laune = await sanityClient.fetch(`
      *[_type == 'la_une'] | order(datetime desc) {
        titre,
        description,
        "imageUrl": image.asset->url
      }
    `, {},  {next : { revalidate: 0 }});
    return laune;
  } catch (error) {
    console.error("Error fetching la_une:", error);
  }
};

type LaUneType = {
  titre: string,
  description: string,
  imageUrl: string,
}

export async function HeroCarousel() {
  const laune : LaUneType[] = await getLaUne();
  return (
    <Carousel className="w-full">
      <CarouselContent className="h-[500px] object-center">
        {laune.map((item, index) => (
          <CarouselItem key={index} className="h-full">
            <div className="relative w-full h-full rounded-lg flex flex-col items-center">
              <div className="z-1 absolute top-0 left-0 rounded-lg w-full h-full">
                <Image
                  src={item.imageUrl}
                  alt="Image à la une"
                  quality={100}
                  fill
                  className="rounded-lg object-cover object-center"
                />
              </div>
              <div className="z-3 absolute bottom-0 left-0 h-fit md:w-1/2 rounded-tr-lg rounded-bl-lg bg-background/80 backdrop-blur-md p-4 flex flex-col gap-2">
                <h2>{item.titre}</h2>
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
