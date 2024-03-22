"use client";
import Image from "next/image";
import { Key, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Media {
  titre: string;
  datetime: string;
  type: string;
  source: string;
  description: string;
}

interface MediaPageProps {
  videos: any;
  images: any;
}

const MediaRender: React.FC<MediaPageProps> = ({ videos, images }) => {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>();

  useEffect(() => {
    if (videos) {
      setSelectedMedia(videos[0])
    }
    else setSelectedMedia(images[0])
    return
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleMediaSelect = (media: Media) => {
    setSelectedMedia(media);
  };

  return (
    <>
      <div className="flex flex-col gap-y-4 scroll-smooth">
        <div className="w-full h-fit">
          <h2 className="my-2">Média séléctionné</h2>
          <p className="text-sm mb-4 text-muted-foreground">Choisissez un média pour à visualiser </p>
          <div className="w-full border rounded-lg flex items-center justify-center h-96">
            {selectedMedia?.type === "video" ? (
                <ReactPlayer url={selectedMedia.source} controls />
            ) : (
              <div className="w-full h-full">
                <Image
                  className="w-full h-full object-contain"
                  src={selectedMedia ? selectedMedia.source : "/placeholder.svg"}
                  alt={selectedMedia ? selectedMedia.titre : "placeholder"}
                  height={1000}
                  width={1000}
                  quality={100}
                />

              </div>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-x-4">
        <div className="w-full h-fit">
          <h2 className="my-4">Videos</h2>
          <div className="h-96 border rounded-lg overflow-y-scroll snap-y snap-mandatory">
            {videos.map((video: Media, index: Key | null | undefined) => (
              <div key={index}>
                <Link className="snap-start snap-always" href={""} onClick={() => handleMediaSelect(video)}>
                  <div className="bg-muted/30 backdrop-blur-lg p-4 flex flex-col justify-center items-start group [&_#btn]:hover:hover:translate-x-2 [&_#btn]:hover:hover:underline [&_#btn]:hover:hover:text-primary [&_p]:hover:hover:translate-x-2">
                    <h4
                      id="btn"
                      className="transition duration-200"
                    >
                      {video.titre}
                    </h4>
                    <p className="text-sm text-muted-foreground transition duration-200">
                      {video.description}
                    </p>
                  </div>
                </Link>
                {index !== videos.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-fit">
          <h2 className="my-4">Images</h2>
          <div className="h-96 border rounded-lg overflow-y-scroll snap-y snap-mandatory">
            {images.map((image: Media, index: Key | null | undefined) => (
              <div key={index}>
                <Link className="snap-start snap-always" href={""} onClick={() => handleMediaSelect(image)}>
                  <div className="bg-muted/30 backdrop-blur-lg p-4 flex flex-col justify-center items-start group [&_#btn]:hover:hover:translate-x-2 [&_#btn]:hover:hover:underline [&_#btn]:hover:hover:text-primary [&_p]:hover:hover:translate-x-2">
                    <h4
                      id="btn"
                      className="transition duration-200"
                    >
                      {image.titre}
                    </h4>
                    <p className="text-sm text-muted-foreground transition duration-200">
                      {image.description}
                    </p>
                  </div>
                </Link>
                {index !== images.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default MediaRender;
