import { EditorPicks } from "@/components/EditorPicks";
import FilActu from "@/components/FilActu/FilActu";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import { Candidats } from "@/components/Candidats";
import Footer from "@/components/Footer";
import { Multimedia } from "@/components/Multimedia/Multimedia";
import LettresElect from "@/components/LettersElect/LettresElect";

export default function Home() {
  return (
    <>
      <Header />
      <main className="px-8 md:px-16">
        <Hero />
        <FilActu />
        <EditorPicks />
        <Candidats />
        <Multimedia />
      </main>
      <Footer />
    </>
  );
}
