import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import { sanityClient } from "@/sanity-client";
import moment from "moment";
import "moment/locale/fr";
import { Separator } from "./ui/separator";

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
      }
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
  // const picks = [
  //   {
  //     title: "Défis électoraux: Les enjeux pour la démocratie sénégalaise",
  //     date: "1 mars 2024",
  //     imageSrc: "/editorial/challenge.jpg",
  //     content:
  //       "Les élections à venir en Senegal présentent des défis majeurs pour la démocratie du pays. Analyse approfondie des obstacles et des opportunités.",
  //   },
  //   {
  //     title: "Les candidats en lice pour les élections présidentielles 2024",
  //     date: "15 février 2024",
  //     imageSrc: "/editorial/course.jpg",
  //     content:
  //       "Découvrez les profils et les plateformes des principaux candidats aux élections présidentielles de 2024 au Sénégal.",
  //   },
  //   {
  //     title: "La jeunesse sénégalaise et son rôle dans les élections à venir",
  //     date: "5 février 2024",
  //     imageSrc: "/editorial/vote.jpg",
  //     content:
  //       "Quel est le rôle de la jeunesse sénégalaise dans les élections à venir? Son engagement politique et ses préoccupations sont au cœur du débat.",
  //   },
  //   {
  //     title:
  //       "Sécurité électorale: les mesures prises pour des élections pacifiques",
  //     date: "20 janvier 2024",
  //     imageSrc: "/editorial/securite.jpg",
  //     content:
  //       "Un aperçu des mesures de sécurité mises en place pour garantir des élections pacifiques et transparentes au Sénégal.",
  //   },
  // ];
  const picks: EditorPicksProps[] = await getEditorial();

  return (
    <section className="space-y-4 my-8">
      <SectionTitle title="Éditorial de la Rédaction" />
      <p className="text-muted-foreground">
        Sélection de nos meilleurs articles sur les élections sénégalaises
      </p>
      <div className="space-y-6">
        <div className="grid gap-6 md:gap-12 ">
          {picks.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-4 md:col-span-1 w-full">
                  <Image
                    alt="Thumbnail"
                    className="overflow-hidden rounded-lg object-cover w-full"
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
                  <Link
                    href={`/editorial/${item.slug.current}`}
                    target="_blank"
                  >
                    <h4 className=" text-primary font-black text-2xl hover:underline">
                      {item.titre}
                    </h4>
                  </Link>
                    <p className="text-muted-foreground my-2">
                      Publié le{" "}
                      {moment(item.datetime).format("dddd Do MMMM, [à] h:mm a")}
                    </p>
                  <p>{item.description}</p>
                </div>
              </div>
              {index !== picks.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
