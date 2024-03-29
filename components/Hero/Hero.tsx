import { HeroCarousel } from "./HeroCarousel";
import LiveMarquee from "./LiveMarquee";

export default async function Hero() {
  return (
    <section className="flex flex-col items-center gap-4 py-4">
      <h1>
        À LA <span className="text-primary">UNE</span>
      </h1>
      <div className="bg-muted w-full h-fit rounded-lg">
        <HeroCarousel />
      </div>
      <LiveMarquee />
    </section>
  );
}
