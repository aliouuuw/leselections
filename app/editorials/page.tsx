import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { sanityClient } from "@/sanity-client";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import moment from "moment";
import "moment/locale/fr";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

moment.locale("fr");

type ArticleType = {
  titre: string;
  slug: { current: string };
  datetime: string;
  type: string;
  description: string;
  imageUrl: string;
};

const getArticles = async () => {
  try {
    const article = await sanityClient.fetch(
      `
        *[_type == 'article' && type == "editorial"] | order(datetime desc) {
          titre,
          slug,
          type,
          description,
          datetime,
          "imageUrl": image.asset->url
        }
      `,
      {},
      { next: { revalidate: 0 } }
    );
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
  }
};

export default async function page() {
  const articles: ArticleType[] = await getArticles();
  return (
    <>
      <Header />
      <main className="px-8 pb-8 md:px-36">
        <div className="text-center py-4">
          <h1>
            ÉDITORIAL DE LA{" "}
            <span className="text-primary">RÉDACTION</span>
          </h1>
        </div>
        <div>
          {articles.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="grid grid-cols-4 gap-x-4">
                <div className="col-span-4 md:col-span-1 w-full">
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
                  <Link
                    href={`/editorials/editorial/${item.slug.current}`}
                    target="_blank"
                    className="self-end"
                  >
                    <Button variant={"outline"}>Voir plus</Button>
                  </Link>
                  </div>
                </div>
              </div>
              {index !== articles.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}