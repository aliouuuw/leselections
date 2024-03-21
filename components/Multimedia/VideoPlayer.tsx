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
    <div className="h-96 bg-background rounded-lg">
      <Carousel theme={CarouselTheme} pauseOnHover>
        {videos.map((item, index) => (
          <div key={index} className="w-full ">
            <ReactPlayer url={item.source} controls />
            <div className="max-h-1/2 w-full backdrop-brightness-75 backdrop-blur-sm opacity-0 hover:opacity-100 absolute top-0 left-0 py-6 px-4 transition-all duration-300">
              <h4 className="border-l border-primary px-2 font-black">{item.titre}</h4>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default VideoPlayer;
