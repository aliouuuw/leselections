"use client";
import { Carousel } from "flowbite-react";
import dynamic from "next/dynamic";
import CarouselTheme from "../carousel-theme";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type VideoProps = {
  videos: {
    titre: string;
    description?: string;
    source: string;
  }[];
};

const VideoPlayer = ({ videos }: VideoProps) => {
  return (
    <div className="h-96 w-full bg-background rounded-lg">
      <Carousel theme={CarouselTheme} pauseOnHover>
        {videos.map((item, index) => (
          <div key={index} className="flex justify-center items-center w-full h-full">
            <ReactPlayer url={item.source} controls />
            <div className="max-h-1/2 w-full text-white backdrop-brightness-50 backdrop-blur-lg opacity-0 hover:opacity-100 absolute top-0 left-0 py-6 px-4 transition-all duration-300">
              <h4 className="border-l border-primary px-2 font-black">{item.titre}</h4>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default VideoPlayer;
