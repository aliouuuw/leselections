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
        *[_type == 'article' && type == "article" || type == "la_une"] | order(datetime desc) {
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
            FIL D&apos;<span className="text-primary italic">ACTUALITÉ</span>
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {articles.map((item) => (
            <div key={item.titre} className="space-y-4">
              <Card className="h-full">
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
                <div className="p-4 space-y-2">
                  <div className="flex gap-x-2 items-center">
                    <Badge
                      className="text-sm"
                      variant={"outline"}
                    >
                      {item.type == "la_une" ? "À la une" : "Article"}
                    </Badge>
                    <p className="text-muted-foreground my-2">
                      Publié le{" "}
                      {moment(item.datetime).format("dddd Do MMMM, [à] h:mm a")}
                    </p>
                  </div>
                  <Link
                    className="text-xl font-black my-2 hover:underline hover:text-primary "
                    href={`/filactu/actualites/${item.slug.current}`}
                  >
                    {item.titre}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
