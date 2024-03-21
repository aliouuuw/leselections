import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import AudioPlayer from "@/components/Multimedia/AudioPlayer";
import { sanityClient } from "@/sanity-client";

const getAudio = async () => {
  try {
    const audios = await sanityClient.fetch(
      `*[_type == 'multimedia' && type == "podcast"]{
              titre,
              datetime,
              "source": fichier.asset -> url,
              "description":fichier.description,
            }
            `,
      {},
      { next: { revalidate: 0 } }
    );
    return audios;
  } catch (error) {
    console.error("Error fetching article:", error);
  }
};

const page = async () => {
  const audios = await getAudio();
  return (
    <>
      <Header />
      <main className="px-8 pb-8 md:px-36">
        <div className="text-center py-4">
          <h1 className="mb-4">PODCASTS</h1>
          <div>
          </div>
        </div>
            <p className="text-muted-foreground mb-4">Découvrez tous nos podcasts</p>
            <AudioPlayer audios={audios} size="80vh" />
      </main>
      <Footer />
    </>
  );
};

export default page;
