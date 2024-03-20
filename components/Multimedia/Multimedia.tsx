import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../SectionTitle";
import { ScrollArea } from "../ui/scroll-area";
import { sanityClient } from "@/sanity-client";
import { MediaGrid } from "./MediaGrid";

// Define an interface for media objects
interface MediaProps {
  titre: string;
  slug: { current: string };
  type: string;
  imageUrl: string;
}

const getMedia = async () => {
  try {
    const media = await sanityClient.fetch(
      `
      *[_type == 'multimedia'] | order(datetime desc) {
        titre,
        slug,
        "imageUrl": vignette.asset -> url,
        type,
      }
    `,
      {},
      { next: { revalidate: 0 } }
    );
    return media;
  } catch (error) {
    console.error("Error fetching editorial:", error);
  }
};

export async function Multimedia() {
  // const handleTypeChange = (selectedType: string) => {
  //   const filtered =
  //     selectedType === "tout"
  //       ? media
  //       : media.filter(
  //           (m) => m.type.toLowerCase() === selectedType.toLowerCase()
  //         );
  //   setFilteredMedia(filtered);
  // };
  const media: MediaProps[] = await getMedia();

  return (
    <section className="space-y-4 my-8">
      <SectionTitle title="Multimédia" />
      <p className="text-muted-foreground">
        Explorez une variété de contenus, des vidéos aux podcasts
      </p>
      <div className="grid items-start gap-6 md:grid-cols-2">
        {/* <div className="space-y-4">
          <Select
            onValueChange={(value) => handleTypeChange(value)}
            defaultValue="tout"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Media</SelectLabel>
                <Separator />
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="photo">Photo</SelectItem>
                <SelectItem value="podcast">Podcast</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <Separator />
                <SelectItem value="tout">Voir tout</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div> */}
      </div>
      <MediaGrid />
    </section>
  );
}
