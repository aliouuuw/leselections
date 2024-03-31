import { sanityClient } from "@/sanity-client";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/locale/fr";
import VoirPlus from "../VoirPlus";
import { Card, CardContent, CardHeader } from "../ui/card";
import RatioNextImage from "../RatioNextImage";

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
      }[0...3]
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
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {componentItems.map((item, index) => (
          <Link
            href={`/filactu/actualites/${item.slug.current}`}
            target="_blank"
            key={index}
          >
            <Card className="h-full group hover:border-primary [&_h4]:hover:text-primary [&_#img]:hover:scale-[1.02]">
              <CardHeader>
                {item.imageUrl && (
                  <div className="rounded-lg w-full h-52 relative overflow-hidden">
                     <RatioNextImage src={item.imageUrl} alt={item.titre}/>
                  </div>
                )}
              </CardHeader>
              <CardContent className="h-fit group-hover:translate-x-2 transition duration-300 delay-150">
                <h4 className="font-bold my-2 uppercase line-clamp-4">
                  {item.titre}
                </h4>
                <p className="text-muted-foreground my-2">
                  Publié le{" "}
                  {moment(item.datetime).format("dddd Do MMMM, [à] h:mm a")}
                </p>
                <p className="text-sm text-pretty line-clamp-6">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <VoirPlus url="/filactu" />
    </>
  );
}
