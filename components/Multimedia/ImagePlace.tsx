"use client";

import Image from "next/image";
import { Carousel } from "flowbite-react";
import CarouselTheme from "../carousel-theme";

type ImageProps = {
  images: {
    titre: string;
    description?: string;
    source: string;
  }[];
};

const ImagePlace = ({ images }: ImageProps) => {
  return (
    <div className="h-96 bg-background rounded-lg">
      <Carousel theme={CarouselTheme} pauseOnHover>
        {images.map((item, index) => (
          <div key={index} className="relative h-full rounded-lg">
            <Image className="h-full w-full absolute top-0 left-0" width={50} height={50} src={item.source} alt="..." />
            <div className="h-full w-full backdrop-brightness-75 backdrop-blur-sm opacity-0 hover:opacity-100 absolute top-0 left-0 py-6 px-4 transition-all duration-300">
              <h3 className="border-l border-primary px-2 font-black">{item.titre}</h3>
              <p className="my-2 text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImagePlace;
