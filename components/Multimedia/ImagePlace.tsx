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
          <div key={index} className="flex relative h-full w-full rounded-lg">
            <Image className="h-full w-full object-contain absolute top-0 left-0" width={1000} height={1000} quality="100" src={item.source} alt="..." />
            <div className="max-h-1/2 w-full text-white backdrop-brightness-50 backdrop-blur-lg opacity-0 hover:opacity-100 absolute top-0 left-0 py-6 px-4 transition-all duration-300">
              <h4 className="border-l border-primary px-2 font-black">{item.titre}</h4>
              <p className="my-2">{item.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImagePlace;
