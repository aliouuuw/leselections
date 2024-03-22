import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { AudioLines, Image, Video } from "lucide-react";
import { Button } from "../ui/button";
import AudioPlayer from "./AudioPlayer";
import { sanityClient } from "@/sanity-client";
import VideoPlayer from "./VideoPlayer";
import ImagePlace from "./ImagePlace";
import Link from "next/link";

type MediaType = {
  titre: string;
  description: string;
  datetime: string;
  source: string;
};

const getAudio = async () => {
  try {
    const audios = await sanityClient.fetch(
      `*[_type == 'multimedia' && type == "podcast"]{
            titre,
            datetime,
            "source": fichier.asset -> url,
            "description":fichier.description,
          }[0...5]
          `,
      {},
      { next: { revalidate: 0 } }
    );
    return audios;
  } catch (error) {
    console.error("Error fetching article:", error);
  }
};
const getVideo = async () => {
  try {
    const video = await sanityClient.fetch(
      `*[_type == 'multimedia' && type == "video"]{
            titre,
            datetime,
            "source": fichier.asset -> url,
            "description":fichier.description,
          }[0...3]
          `,
      {},
      { next: { revalidate: 0 } }
    );
    return video;
  } catch (error) {
    console.error("Error fetching article:", error);
  }
};
const getImage = async () => {
  try {
    const images = await sanityClient.fetch(
      `*[_type == 'multimedia' && type == "photo"]{
            titre,
            datetime,
            "source": fichier.asset -> url,
            "description":fichier.description,
          }[0...3]
          `,
      {},
      { next: { revalidate: 0 } }
    );
    return images;
  } catch (error) {
    console.error("Error fetching article:", error);
  }
};

export async function MediaGrid() {
  const audios: MediaType[] = await getAudio();
  const videos: MediaType[] = await getVideo();
  const images: MediaType[] = await getImage();

  const items = [
    {
      title: "Images",
      description: <Description description="Toutes nos images" url="/videos_images" />,
      header: <ImagePlace images={images} />,
      className: "md:col-span-1",
      // eslint-disable-next-line jsx-a11y/alt-text
      icon: <Image className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Vidéos",
      description: <Description description="Toutes nos vidéos" url="/videos_images" />,
      header: <VideoPlayer videos={videos} />,
      className: "md:col-span-1",
      icon: <Video className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Audios",
      description: <Description description="Tous nos podcasts" url="/podcasts" />,
      header: <AudioPlayer audios={audios} />,
      className: "md:col-span-2",
      icon: <AudioLines className="h-4 w-4 text-muted-foreground" />,
    },
  ];
  return (
    <BentoGrid className="w-full">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const Description = ({ description, url }: any) => {
  return (
    <div className="flex justify-between items-center">
      <p>{description}</p>
      <Link href={url}>
        <Button variant={"link"} size={"sm"}>
          Voir plus
        </Button>
      </Link>
    </div>
  );
};
