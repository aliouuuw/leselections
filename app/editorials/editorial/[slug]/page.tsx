import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { sanityClient } from "@/sanity-client";
import { notFound } from "next/navigation";
import moment from "moment";
import "moment/locale/fr";
import { PortableText } from "next-sanity";
import { RichTextComponents } from "@/components/RichTextComponents";

interface Params {
  params: {
    slug: string;
  };
}

interface ArticlesType {
  titre: string;
  contenu: any;
  datetime: string;
}

async function getArticle(slug: string) {
  try {
    const query = `
        *[_type == 'article' && slug.current == "${slug}"][0] {
            titre,
            contenu,
            datetime
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
      <main className="px-8 md:px-36">
        <header className="py-14 px-4 mb-14 text-center border-b">
          <h4 className="uppercase text-xl md:text-4xl mx-auto max-w-4xl font-bold">
            {article.titre}
          </h4>
          <div className=" w-full flex items-center justify-center my-4 gap-4">
            <span>
              {" "}
              Publié le{" "}
              {moment(article.datetime).format("dddd Do MMMM, [à] h:mm a")}
            </span>
          </div>
        </header>
        <article className="text-justify text-pretty mb-14">
          <div>
            {article.contenu && (
              <PortableText
                value={article.contenu}
                components={RichTextComponents}
              />
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default page;
