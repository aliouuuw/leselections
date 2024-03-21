import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
            FIL D&apos;<span className="text-primary">ACTUALITÉ</span>
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {articles.map((item, index) => (
           <Link
           href={`/filactu/actualites/${item.slug.current}`}
           target="_blank"
           key={index}
         >
           <Card className="h-full group [&_h2]:hover:text-primary [&_#img]:hover:scale-[1.05]">
             <CardHeader>
               {item.imageUrl && (
                 <Image
                   alt={item.imageUrl}
                   id="img"
                   className="rounded-lg w-full h-80 transform transition duration-300"
                   height={300}
                   width={600}
                   src={item.imageUrl}
                 />
               )}
             </CardHeader>
             <CardContent className="h-fit group-hover:-translate-y-2 transition duration-300 delay-50">
               <h2 className="text-2xl font-bold my-2">{item.titre}</h2>
               <div className="flex flex-wrap gap-x-2 items-center">
                <p className="text-primary">{item.type === "la_une" ? "À la une" : "Article"}</p>
               <p className="text-muted-foreground my-2">
                 Publié le{" "}
                 {moment(item.datetime).format("dddd Do MMMM, [à] h:mm a")}
               </p>

               </div>
               <p className="text-pretty text-justify ">{item.description}</p>
             </CardContent>
           </Card>
         </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
