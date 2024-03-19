import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { sanityClient, urlFor } from "@/sanity-client";
import { notFound } from "next/navigation";
import moment from "moment";
import "moment/locale/fr";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import candidat from "@/sanity/schemaTypes/candidat";
const BlockContent = require("@sanity/block-content-to-react");

interface Params {
  params: {
    slug: string;
  };
}

interface ArticlesType {
  titre: string;
  contenu: string;
  datetime: string;
  type: string;
  imageUrl: string;
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

const page = async ({ params }: Params) => {
  const article: ArticlesType = await getArticle(params?.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="px-8 pb-8 md:px-36">
        <div>
          <header className="relative px-4 md:px-6 py-6">
            <div className="absolute top-0 left-0 -z-10 h-full w-full backdrop-blur-3xl">
              {article.imageUrl && (
                <Image
                  alt="Hero image"
                  className="h-full w-full overflow-hidden rounded-lg object-cover brightness-75 opacity-40"
                  height={600}
                  src={article.imageUrl}
                  quality={100}
                  width={1200}
                />
              )}
            </div>
            <div className="space-y-1.5 h-full">
              <h1 className="text-3xl leading-9 font-bold tracking-tight">
                {article.titre}
              </h1>
              <div className="flex space-x-2 text-sm">
                <span className="font-medium text-muted-foreground">
                  {article.type == "la_une" ? "À la une" : "Article"}
                </span>
                <span className="text-muted-foreground">—</span>
                <time className="font-medium" dateTime={article.datetime}>
                  Publié le{" "}
                  {moment(article.datetime).format("dddd Do MMMM, [à] h:mm a")}
                </time>
              </div>
            </div>
          </header>
          <Separator className="my-4" />
          <div className="px-4 md:px-6 py-6 space-y-8 prose max-w-none [&_ul]:list-disc [&_ol]:list-decimal">
            <BlockContent
              projectId={"yrzayet7"}
              dataset={"production"}
              blocks={article.contenu}
              serializers={serializers}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;

const serializers = {
  types: {
    block: (props: { node: { style: any }; children: React.ReactNode }) => {
      switch (props.node.style) {
        case "h1":
          return <h1 className="my-4">{props.children}</h1>;
        case "h2":
          return <h2 className="my-4">{props.children}</h2>;
        case "h3":
          return <h3 className="my-4">{props.children}</h3>;
        case "h4":
          return <h4 className="my-4">{props.children}</h4>;
        case "span":
          return <span className="my-4">{props.children}</span>;
        case "ul":
          return <ul className="list-disc">{props.children}</ul>;
        default:
          return <p className="my-4">{props.children}</p>;
      }
    },
  },
};
