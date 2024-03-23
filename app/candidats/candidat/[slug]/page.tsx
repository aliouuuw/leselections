import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { sanityClient } from "@/sanity-client";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/components/RichTextComponents";
import ShareButtons from "@/components/ShareButtons";

interface Params {
  params: {
    slug: string;
  };
}

interface CandidatType {
  nom: string;
  age: number;
  lieu_de_naissance: string;
  parti: string;
  bio: any;
  programUrl: string;
  photoUrl: string;
}

async function getCandidat(slug: string) {
  try {
    const query = `
        *[_type == 'candidat' && slug.current == "${slug}"][0] {
            nom,
            age,
            lieu_de_naissance,
            parti,
            bio,
            "programUrl": programme.asset -> url,
            "photoUrl": photo.asset -> url,
        }
      `;

    const candidat = await sanityClient.fetch(
      query,
      {},
      { next: { revalidate: 0 } }
    );
    return candidat;
  } catch (error) {
    console.error("Error fetching candidat info:", error);
  }
}

const CandidatPage = async ({ params }: Params) => {
  const candidat: CandidatType = await getCandidat(params?.slug);

  if (!candidat) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="px-8 md:px-36 ">
        <div className="text-center py-4">
          <h1>
            PROFIL DU <span className="text-primary">CANDIDAT</span>
          </h1>
        </div>
        <Card className="w-full bg-background mx-auto mb-8 py-8">
          <CardContent className="flex flex-col items-start space-y-4">
            <div className="max-md:block flex gap-2 w-full">
              {candidat.photoUrl && (
                <Image
                  alt="Photo de profil du candidat"
                  className="max-md:w-full rounded-lg"
                  height={300}
                  width={300}
                  quality={100}
                  src={candidat.photoUrl}
                  objectFit="cover"
                />
              )}
              <div className="w-full  max-md:my-4 flex items-center space-x-4">
                <div className="grid text-base gap-1.5">
                  <div className="font-semibold">{candidat.nom}</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <p>
                      {candidat.parti} &nbsp;{" | "} &nbsp; {candidat.age} ans
                      &nbsp;{" | "} &nbsp; {candidat.lieu_de_naissance}
                    </p>
                  </div>
                  <ShareButtons url={`leselections.info/candidats/candidat/${params?.slug}`}/>
                </div>
              </div>
            </div>
            <Card className="w-full">
              <CardContent className="text-sm py-4">
                {candidat.bio && (
                  <PortableText
                    value={candidat.bio}
                    components={RichTextComponents}
                  />
                )}
              </CardContent>
            </Card>
            <Button size="lg">
              <a href={candidat.programUrl} target="_blank">
                Télécharger le Programme
              </a>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default CandidatPage;
