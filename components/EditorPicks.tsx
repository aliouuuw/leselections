import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import { sanityClient } from "@/sanity-client";
import moment from "moment";
import "moment/locale/fr";
import { Separator } from "./ui/separator";
import VoirPlus from "./VoirPlus";
import { Button } from "./ui/button";

type EditorPicksProps = {
  titre: string;
  slug: { current: string };
  datetime: string;
  description: string;
  imageUrl: string;
};

const getEditorial = async () => {
  try {
    const editorial = await sanityClient.fetch(
      `
      *[_type == 'article' && type == "editorial"] | order(datetime desc) {
        titre,
        slug,
        datetime,
        description,
        "imageUrl": image.asset->url
      }[0...3]
    `,
      {},
      { next: { revalidate: 0 } }
    );
    return editorial;
  } catch (error) {
    console.error("Error fetching editorial:", error);
  }
};

export async function EditorPicks() {
  const picks: EditorPicksProps[] = await getEditorial();

  return (
    <section className="space-y-4 my-8">
      <SectionTitle title="Éditorial de la rédaction" />
      <p className="text-muted-foreground">
        Analyses réfléchies et articles d&apos;opinion de notre équipe
        éditoriale
      </p>
      <div className="space-y-6">
        <div>
          {picks.map((item, index) => (
            <Link
              href={`/editorials/editorial/${item.slug.current}`}
              target="_blank"
              key={index}
            >
              <div className="flex flex-col gap-2 group [&_h4]:hover:text-primary">
                <div className="grid grid-cols-4 gap-x-4">
                  <div className="col-span-4 md:col-span-1 w-full">
                    {item.imageUrl && (
                      <Image
                        alt="Thumbnail"
                        className="overflow-hidden rounded-lg object-cover w-full h-full"
                        height={300}
                        width={600}
                        src={item.imageUrl}
                        style={{
                          aspectRatio: "2/1",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                  <div className="col-span-4 md:col-span-3">
                    <h4 className="font-black text-2xl">
                      {item.titre}
                    </h4>
                    <p className="text-muted-foreground my-2">
                      Publié le{" "}
                      {moment(item.datetime).format("dddd Do MMMM, [à] h:mm a")}
                    </p>
                    <div className="flex flex-col gap-2">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
                {index !== picks.length - 1 && <Separator className="my-2" />}
              </div>
            </Link>
          ))}
        </div>
        <VoirPlus url="/editorials" />
      </div>
    </section>
  );
}
