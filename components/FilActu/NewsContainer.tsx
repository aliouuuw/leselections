import { sanityClient } from "@/sanity-client";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/locale/fr";
import VoirPlus from "../VoirPlus";

moment.locale("fr");

type ActualitéType = {
  titre: string;
  slug: { current: string };
  datetime: string;
  description: string;
  imageUrl: string;
};

const getActualités = async () => {
  try {
    const article = await sanityClient.fetch(
      `
      *[_type == 'article' && type == "article"] | order(datetime desc) {
        titre,
        slug,
        description,
        datetime,
        "imageUrl": image.asset->url
      }[0...4]
    `,
      {},
      { next: { revalidate: 0 } }
    );
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
  }
};

export default async function NewsContainer() {
  const componentItems: ActualitéType[] = await getActualités();

  return (
    <>
    <div className="grid gap-4 mx-auto lg:max-w-screen lg:grid-cols-2 ">
      {componentItems.map((item, index) => (
        <div key={index} className="space-y-2 mb-4">
          <div className="relative">
            <Image
              alt={item.imageUrl}
              className="rounded-lg object-cover w-full"
              height={300}
              width={600}
              src={item.imageUrl}
              style={{
                aspectRatio: "2/1",
                objectFit: "cover",
              }}
            />
          </div>
          <Link href={`/filactu/actualites/${item.slug.current}`} target="_blank">
            <h2 className="text-2xl font-bold my-2 hover:underline hover:text-primary">
              {item.titre}
            </h2>
          </Link>
          <p className="text-muted-foreground my-2">
            Publié le {moment(item.datetime).format("dddd Do MMMM, [à] h:mm a")}
          </p>
          <p className="text-pretty text-justify ">{item.description}</p>
        </div>
      ))}

    </div>
      <VoirPlus url="/filactu" />
    </>
  );
}
