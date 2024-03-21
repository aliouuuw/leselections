import SectionTitle from "../SectionTitle";
import { MediaGrid } from "./MediaGrid";

export function Multimedia() {
  return (
    <section className="space-y-4 my-8">
      <SectionTitle title="Multimédia" />
      <p className="text-muted-foreground">
        Explorez une variété de contenus, des vidéos aux podcasts
      </p>
      <MediaGrid />
    </section>
  );
}
