import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Button variant="default"> Click me </Button>
    </main>
  );
}
