import Image from "next/image";
import { Button } from "../ui/button";
import { sanityClient } from "@/sanity-client";
import Link from "next/link";
import { Carousel } from "flowbite-react";
import CarouselTheme from "../carousel-theme";

const getLaUne = async () => {
  try {
    const laune = await sanityClient.fetch(
      `
      *[_type == 'article' && type == "la_une"] | order(datetime desc) {
        titre,
        slug,
        description,
        datetime,
        "imageUrl": image.asset->url
      }[0...3]
    `,
      {},
      { next: { revalidate: 0 } }
    );
    return laune;
  } catch (error) {
    console.error("Error fetching la_une:", error);
  }
};

type LaUneType = {
  titre: string;
  slug: { current: string };
  description: string;
  imageUrl: string;
};

export async function HeroCarousel() {
  const laune: LaUneType[] = await getLaUne();
  return (
    <div className="h-[60vh] md:h-[70vh] xl:h-[85vh]">
      <Carousel theme={CarouselTheme} pauseOnHover>
        {laune.map((item, index) => (
          <div key={index} className="relative w-full h-full rounded-lg">
            <div className="absolute top-0 left-0 w-full h-1/2 md:h-full">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt="Image à la une"
                  quality={100}
                  fill
                  className="w-full h-full rounded-top-lg object-center"
                />
              )}
            </div>
            <div className="absolute bottom-0 left-0 w-full max-sm:min-h-[50%] md:max-h-[50%] rounded-b-lg bg-background/80 backdrop-blur-md p-4 flex flex-col gap-2">
              <h3 className="max-sm:text-base font-black uppercase line-clamp-2">{item.titre}</h3>
              <p className="max-sm:text-xs line-clamp-2">{item.description}</p>
              <Link
                href={`/filactu/actualites/${item.slug.current}`}
                target="_blank"
              >
                <Button
                  variant={"default"}
                  className="w-28 self-end max-sm:h-6 max-sm:text-xs max-sm:w-20"
                >
                  Lire l&apos;article{" "}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
