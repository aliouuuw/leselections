import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import { Separator } from "./ui/separator";
import { sanityClient } from "@/sanity-client";

type CandidatsProps= {
  nom: string;
  slug: string;
  parti: string;
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
export async function Candidats() {

  const candidatesList: CandidatsProps[] = await getCandidates();

  return (
    <section className="space-y-4 my-8">
      <SectionTitle title="Candidats" />
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
    </section>
  );
}
function CandidateCard({ nom, parti, apercu, imageUrl, slug }: CandidatsProps) {
  return (
    <Card>
      <div className="flex items-center space-x-4 p-4">
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
        <CardHeader className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold">{nom}</h3>
          <p className="text-sm text-muted-foreground">{parti}</p>
        </CardHeader>
      </div>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Parcours politique</p>
        <p className="text-sm">{apercu}</p>
      </CardContent>
      <CardFooter>
        <Link href="#" passHref>
          <Button size="sm">Voir le profil</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

