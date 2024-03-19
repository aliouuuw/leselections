import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { sanityClient, urlFor } from "@/sanity-client";
import { notFound } from "next/navigation";
import moment from "moment";
import "moment/locale/fr";
const BlockContent = require("@sanity/block-content-to-react");

interface Params {
  params: {
    slug: string;
  };
}

interface ArticlesType {
  titre: string,
  contenu: string,
  datetime: string,
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

    const article = await sanityClient.fetch(query, {},  {next : { revalidate: 0 }});
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
            <span> Publié le {moment(article.datetime).format("dddd Do MMMM, [à] h:mm a")}</span>
          </div>
        </header>
        <article className="text-justify text-pretty mb-14">
          <div>
            {article.contenu && <BlockContent projectId={"yrzayet7"} dataset={"production"} blocks={article.contenu} serializers={serializers} />}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default page;

const serializers = {
    types: {
        block: (props: { node: { style: any; }; children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.PromiseLikeOfReactNode | null | undefined; }) => {
          switch (props.node.style) {
            case 'h1':
              return <h1 className="my-4">{props.children}</h1>
            case 'h4':
              return <h4 className="my-4">{props.children}</h4>
            case 'span':
              return <span className="my-4">{props.children}</span>
            default:
              return <p className="my-4">{props.children}</p>
          }
        }
      },
  }