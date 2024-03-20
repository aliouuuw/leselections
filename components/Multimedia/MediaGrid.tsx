import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { AudioLines, Image, Video } from "lucide-react";
import { Button } from "../ui/button";
import AudioPlayer from "../AudioPlayer";
import { sanityClient } from "@/sanity-client";
import VideoPlayer from "../VideoPlayer";
import ImagePlace from "../ImagePlace";

type MediaType = {
  titre: string;
  type: string;
  datetime: string;
  source: string;
};

const getAudio = async () => {
  try {
    const audios = await sanityClient.fetch(
      `*[_type == 'multimedia' && type == "podcast"]{
            titre,
            type,
            datetime,
            "source": fichier.asset -> url,
          }
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
            type,
            datetime,
            "source": fichier.asset -> url,
          }
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
            type,
            datetime,
            "source": fichier.asset -> url,
          }
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
      title: "Audios",
      description: <Description description="Tous nos podcasts" />,
      header: (
        <AudioPlayer
          titre={audios[0].titre}
          type={audios[0].type}
          source={audios[0].source}
        />
      ),
      className: "md:col-span-1",
      icon: <AudioLines className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Images",
      description: <Description description="Toutes nos images" />,
      header: (
        <ImagePlace
          titre={images[0] ? images[0].titre : ""}
          type={images[0] ? images[0].type : ""}
          source={images[0].source}
        />
      ),
      className: "md:col-span-1",
      // eslint-disable-next-line jsx-a11y/alt-text
      icon: <Image className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Vidéos",
      description: <Description description="Toutes nos vidéos" />,
      header: (
        <VideoPlayer
          titre={videos[0].titre}
          type={videos[0].type}
          source={videos[0].source}
        />
      ),
      className: "md:col-span-2",
      icon: <Video className="h-4 w-4 text-muted-foreground" />,
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
const Skeleton = () => (
  <div className="flex flex-1 w-full h-fit min-h-[10rem] rounded-xl  border border-muted bg-card"></div>
);

const Description = ({ description }: any) => {
  return (
    <div className="flex justify-between items-center">
      <p>{description}</p>
      <Button variant={"outline"} size={"sm"}>
        Voir plus
      </Button>
    </div>
  );
};
