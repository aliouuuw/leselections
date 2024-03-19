import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import { ScrollArea } from "./ui/scroll-area";
import { sanityClient } from "@/sanity-client";

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
      <ScrollArea className="h-[80vh] p-4 rounded-md border">
        <div className="grid grid-cols-1 items-start gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {media.map((item, index) => (
            <div key={index} className="col-span-1 flex flex-col space-y-2">
              <Link className="font-medium" href="/">
                {item.imageUrl && (
                  <Image
                    alt="Thumbnail"
                    className="aspect-video object-cover group-hover:opacity-75 transition-opacity rounded-lg overflow-hidden"
                    height={225}
                    src={item.imageUrl}
                    width={400}
                  />
                )}
                <p className="uppercase text-primary my-2">{item.type}</p>{" "}
                {item.titre}
              </Link>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
