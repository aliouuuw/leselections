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
import { sanityClient } from "@/sanity-client";
import VoirPlus from "./VoirPlus";

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
      }[0...3]
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
        Découvrez les candidats à l&apos;élection présidentielle
      </p>
      <div className="grid items-center gap-4 my-4">
        <div className="grid gap-6 md:gap-12 lg:grid-cols-2 xl:grid-cols-3">
          {candidatesList.map((candidate, index) => (
            <CandidateCard key={index} {...candidate} />
          ))}
        </div>
      </div>
      <VoirPlus url="/candidats" />
    </section>
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
    <Card className="group hover:shadow-xl hover:border hover:border-primary transition-all duration-200">
      <div className="flex items-center space-x-4 p-4 translate-x-0 group-hover:translate-x-2 transition duration-200 delay-75">
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
      <CardContent className="space-y-2 translate-x-0 group-hover:translate-x-2 transition duration-200 delay-150">
        <p className="text-sm text-muted-foreground">Bio</p>
        <p className="text-sm">{apercu}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/candidats/candidat/${slug.current}`} passHref>
          <Button variant={"link"} size="sm">
            Voir le profil
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
