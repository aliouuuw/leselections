import Image from "next/image";

export default function Development() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-2 text-center">
      <Image
        alt="Logo"
        height="90"
        src="/icon.png"
        style={{
          aspectRatio: "180/90",
          objectFit: "cover",
        }}
        width="180"
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Bientôt disponible
        </h1>
        <p className="text-muted-foreground md:text-xl/relaxed">
          Nous travaillons actuellement sur notre site web et reviendrons
          bientôt!
        </p>
      </div>
    </div>
  );
}
