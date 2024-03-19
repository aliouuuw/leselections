import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/sanity-client";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";

type CandidatsProps = {
  nom: string;
  slug: { current: string };
  parti: string;
  age: number;
  apercu: string;
  imageUrl: string;
};

const getCandidates = async () => {
  try {
    const candidates = await sanityClient.fetch(
      `
      *[_type == 'candidat'] {
        nom,
        slug,
        parti,
        age,
        apercu,
        "imageUrl": photo.asset->url
      }
    `,
      {},
      { next: { revalidate: 0 } }
    );
    return candidates;
  } catch (error) {
    console.error("Error fetching la_une:", error);
  }
};
export default async function Candidats() {
  const candidatesList: CandidatsProps[] = await getCandidates();

  return (
    <>
      <Header />
      <main className="px-8 pb-8 md:px-36">
        <div className="text-center py-4">
          <h1>
            PROFILS DES <span className="text-primary">CANDIDATS</span>
          </h1>
        </div>
        <p className="text-muted-foreground">
          Découvrez les candidats aux prochaines élections
        </p>
        <div className="grid items-center gap-4 my-4">
          <div className="grid gap-6 md:gap-12 lg:grid-cols-2 xl:grid-cols-3">
            {candidatesList.map((candidate, index) => (
              <CandidateCard key={index} {...candidate} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
function CandidateCard({
  nom,
  age,
  parti,
  apercu,
  imageUrl,
  slug,
}: CandidatsProps) {
  return (
    <Card>
      <div className="flex items-center space-x-4 p-4">
        {imageUrl && (
          <Image
            alt="Image"
            className="rounded-full"
            height="80"
            src={imageUrl}
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
            width="80"
          />
        )}
        <CardHeader className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold">{nom}</h3>
          <div className="flex gap-2">
            <p className="text-sm text-muted-foreground">
              {age} ans &nbsp;{" | "} &nbsp; {parti}
            </p>
          </div>
        </CardHeader>
      </div>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Parcours politique</p>
        <p className="text-sm">{apercu}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/candidats/candidat/${slug.current}`} passHref>
          <Button size="sm">Voir le profil</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
