import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./SectionTitle";

export function EditorPicks() {
  const picks = [
    {
      title: "Défis électoraux: Les enjeux pour la démocratie sénégalaise",
      date: "1 mars 2024",
      imageSrc: "/editorial/challenge.jpg",
      content:
        "Les élections à venir en Senegal présentent des défis majeurs pour la démocratie du pays. Analyse approfondie des obstacles et des opportunités.",
    },
    {
      title: "Les candidats en lice pour les élections présidentielles 2024",
      date: "15 février 2024",
      imageSrc: "/editorial/course.jpg",
      content:
        "Découvrez les profils et les plateformes des principaux candidats aux élections présidentielles de 2024 au Sénégal.",
    },
    {
      title: "La jeunesse sénégalaise et son rôle dans les élections à venir",
      date: "5 février 2024",
      imageSrc: "/editorial/vote.jpg",
      content:
        "Quel est le rôle de la jeunesse sénégalaise dans les élections à venir? Son engagement politique et ses préoccupations sont au cœur du débat.",
    },
    {
      title:
        "Sécurité électorale: les mesures prises pour des élections pacifiques",
      date: "20 janvier 2024",
      imageSrc: "/editorial/securite.jpg",
      content:
        "Un aperçu des mesures de sécurité mises en place pour garantir des élections pacifiques et transparentes au Sénégal.",
    },
  ];
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
              <Link href="#" passHref legacyBehavior>
                <a className="font-bold text-2xl hover:underline">
                  {item.title}
                </a>
              </Link>
              <p className="text-muted-foreground">Posted on {item.date}</p>
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-4 md:col-span-1 w-full">
                  <Image
                    alt="Thumbnail"
                    className="overflow-hidden rounded-lg object-cover w-full"
                    height={300}
                    width={600}
                    src={item.imageSrc}
                    style={{
                      aspectRatio: "2/1",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p className="col-span-4 md:col-span-3">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
