"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { ScrollArea } from "./ui/scroll-area";

// Define an interface for media objects
interface Media {
  type: string;
  title: string;
  link: string;
}

export function Multimedia() {
  const media = [
    { type: "video", title: "The Secret Life of Gnomes", link: "#" },
    { type: "video", title: "The Secret Life of Gnomes", link: "#" },
    { type: "podcast", title: "The Sound of Silence", link: "#" },
    { type: "podcast", title: "The Sound of Silence", link: "#" },
    { type: "podcast", title: "The Sound of Silence", link: "#" },
    { type: "interview", title: "In Conversation with the Stars", link: "#" },
    { type: "interview", title: "In Conversation with the Stars", link: "#" },
    { type: "photo", title: "In Conversation with the Planets", link: "#" },
    { type: "photo", title: "In Conversation with the Planets", link: "#" },
  ];
  const [filteredMedia, setFilteredMedia] = useState<Media[]>(media);

  const handleTypeChange = (selectedType: string) => {
    const filtered =
      selectedType === "tout"
        ? media
        : media.filter(
            (m) => m.type.toLowerCase() === selectedType.toLowerCase()
          );
    setFilteredMedia(filtered);
  };

  return (
    <section className="space-y-4 my-8">
      <SectionTitle title="Multimédia" />
      <p className="text-muted-foreground">
        Explorez une variété de contenus, des vidéos aux podcasts
      </p>
      <div className="grid items-start gap-6 md:grid-cols-2">
        <div className="space-y-4">
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
        </div>
      </div>
        <ScrollArea className="h-[80vh] p-4 rounded-md border">
      <div className="grid grid-cols-1 items-start gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMedia.map((item, index) => (
            <div key={index} className="col-span-1 flex flex-col space-y-2">
              <Link className="font-medium" href={item.link}>
                <Image
                  alt="Thumbnail"
                  className="aspect-video object-cover group-hover:opacity-75 transition-opacity rounded-lg overflow-hidden"
                  height={225}
                  src="/placeholder.svg"
                  width={400}
                />
                <p className="uppercase text-primary">{item.type}:</p>{" "}
                {item.title}
              </Link>
            </div>
          ))}
      </div>
        </ScrollArea>
    </section>
  );
}
