import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { sanityClient } from "@/sanity-client";
import MediaRender from "./MediaRender";

const getVideos = async () => {
  try {
    const videos = await sanityClient.fetch(
      `*[_type == 'multimedia' && type == "video"]{
        titre,
        type,
        datetime,
        "source": fichier.asset -> url,
        "description":fichier.description,
      }`,
      {},
      { next: { revalidate: 0 } }
    );
    return videos;
  } catch (error) {
    throw new Error("Error fetching videos");
  }
};

const getImages = async () => {
  try {
    const images = await sanityClient.fetch(
      `*[_type == 'multimedia' && type == "photo"]{
        titre,
        type,
        datetime,
        "source": fichier.asset -> url,
        "description": fichier.description,
      }`,
      {},
      { next: { revalidate: 0 } }
    );
    return images;
  } catch (error) {
    throw new Error("Error fetching images");
  }
};

const page = async () => {
  const videos = await getVideos();
  const images = await getImages();
  return (
    <>
      <Header />
      <main className="px-8 pb-8 md:px-36">
        <div className="text-center py-4">
          <h1>VIDÉOS & <span className="text-primary">IMAGES</span></h1>
        </div>
        <MediaRender videos={videos} images={images} />
      </main>
      <Footer />
    </>
  );
};

export default page;
