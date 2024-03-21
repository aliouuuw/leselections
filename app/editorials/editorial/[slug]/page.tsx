import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { sanityClient } from "@/sanity-client";
import { notFound } from "next/navigation";
import moment from "moment";
import "moment/locale/fr";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { RichTextComponents } from "@/components/RichTextComponents";
import Link from "next/link";

interface Params {
  params: {
    slug: string;
  };
}

interface ArticlesType {
  titre: string;
  contenu: any;
  datetime: string;
  type: string;
  imageUrl: string;
  slug: {current: string}
}

async function getArticle(slug: string) {
  try {
    const query = `
        *[_type == 'article' && slug.current == "${slug}"][0] {
            titre,
            contenu,
            type,
            datetime,
            "imageUrl": image.asset -> url,
          }
        `;

    const article = await sanityClient.fetch(
      query,
      {},
      { next: { revalidate: 0 } }
    );
    return article;
  } catch (error) {
    console.error("Error fetching article info:", error);
  }
}
async function getArticles(slug: string) {
  try {
    const query = `
        *[_type == 'article' && type == "editorial" && slug.current != "${slug}"] {
            titre,
            slug,
            type,
            "imageUrl": image.asset -> url,
          }
        `;

    const article = await sanityClient.fetch(
      query,
      {},
      { next: { revalidate: 0 } }
    );
    return article;
  } catch (error) {
    console.error("Error fetching article info:", error);
  }
}



const page = async ({ params }: Params) => {
  const article: ArticlesType = await getArticle(params?.slug);
  const others: ArticlesType[] = await getArticles(params?.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <header className="relative h-96 w-screen px-8 md:px-36 py-6">
          <div className="absolute top-0 left-0 -z-10 h-full w-full">
            {article.imageUrl && (
              <Image
                alt="Hero image"
                className="h-full w-full overflow-hidden object-fill brightness-50 opacity-40"
                height={600}
                src={article.imageUrl}
                quality={100}
                width={1200}
              />
            )}
          </div>
          <div className="px-8 md:px-36 h-full w-full p-8 absolute top-0 left-0 backdrop-blur-md dark:backdrop-blur-lg flex items-center justify-center">
            <div className="flex justify-around items-center max-sm:scale-75 max-md:scale-90">
              <div className="w-1/2">
                <h2 className=" leading-9 font-bold tracking-tight">
                  {article.titre}
                </h2>
                <div className="flex space-x-2 text-sm">
                  <span className="font-medium text-muted-foreground">
                    {article.type == "la_une" ? "À la une" : "Article"}
                  </span>
                  <span className="text-muted-foreground">—</span>
                  <time className="font-medium" dateTime={article.datetime}>
                    Publié le{" "}
                    {moment(article.datetime).format(
                      "dddd Do MMMM, [à] h:mm a"
                    )}
                  </time>
                </div>
              </div>
              <div className="ml-auto max-md:scale-90">
                {article.imageUrl && (
                  <Image
                    alt="Hero image"
                    className="h-full w-full overflow-hidden object-fill"
                    height={200}
                    src={article.imageUrl}
                    quality={100}
                    width={200}
                  />
                )}
              </div>
            </div>
          </div>
        </header>
        <div className="px-8 pb-8 w-full md:px-36 grid grid-cols-3">
          <div className="w-full py-8 px-2 lg:max-w-[80%] text-pretty col-span-3 lg:col-span-2">
            <h2>{article.type == "la_une" ? "À la une:" : "Article:"}</h2>
            <PortableText
              value={article.contenu}
              components={RichTextComponents}
            />
          </div>
          <div className="py-8 w-full col-span-3 lg:col-span-1">
            <h3>Autres articles</h3>
            <div className="w-full bg-background rounded-lg border ">
              <div
                className="h-96 w-full snap-y snap-mandatory overflow-scroll"
              >
                {others.map((article, index) => (
                  <Link
                    key={index}
                    href={`/filactu/actualites/${article.slug.current}`}
                    className="group [&_h4]:hover:underline [&_h4]:hover:text-primary [&>div]:hover:translate-x-2 transtion duration-200 snap-start snap-always p-4 flex items-center justify-between gap-4 flex-wrap"
                  >
                    <div>
                      <h4 className="font-medium tracking-tight transition-all duration-200 delay-100">
                        {article.titre}
                      </h4>
                      <p className="text-sm text-primary mt-1">
                        {article.type === "la_une" ? "À la une" : "Article"}
                      </p>
                    </div>
                    {index !== others.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
