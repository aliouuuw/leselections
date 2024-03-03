"use client"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { useState } from "react";

type Candidate = {
  name: string;
  party: string;
  background: string;
};

export function Candidats() {
  const candidates = [
    {
      name: "Sarah Johnson",
      party: "PDS",
      background:
        "Sarah Johnson est membre active de sa communauté depuis plus d'une décennie. Elle a siégé au conseil scolaire et a été une défenseure active de la réforme de l'éducation.",
    },
    {
      name: "Michael Smith",
      party: "APR",
      background:
        "Michael Smith a une expérience dans le monde des affaires et s'est engagé à apporter une perspective nouvelle à la politique. Il se concentre sur les questions économiques et la création d'emplois.",
    },
    {
      name: "Maria Rodriguez",
      party: "PS",
      background:
        "Maria Rodriguez est une organisatrice communautaire qui s'est impliquée dans des efforts de base pour résoudre les problèmes sociaux. Elle se présente sur une plateforme d'inclusivité et de diversité.",
    },
  ];

  const [filteredacandidates, setfilteredcandidates] = useState<Candidate[]>(candidates);

  const handleTypeChange = (selectedtype: string) => {
    var foo =
      selectedtype == "tout"
        ? candidates
        : candidates.filter((doc ) => {
            return (
              doc.party.replace(/ /g, "").replace("_", "").toLowerCase() ==
              selectedtype.toLowerCase()
            );
          });
    setfilteredcandidates(foo);
  };
  return (
    <section className="space-y-4 my-8">
      <SectionTitle title="Rencontrez les candidats" />
      <p className="text-muted-foreground">
        Découvrez les candidats aux prochaines élections
      </p>
      <div className="grid items-center gap-4 my-4">
        <div className="grid gap-4 md:gap-6">
          <Select
            onValueChange={(value) => handleTypeChange(value)}
            defaultValue="tout"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Parti</SelectLabel>
                <Separator />
                <SelectItem value="apr">APR</SelectItem>
                <SelectItem value="pds">PDS</SelectItem>
                <SelectItem value="ps">PS</SelectItem>
                <Separator />
                <SelectItem value="tout">Tout</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6 md:gap-12 lg:grid-cols-2 xl:grid-cols-3">
          {filteredacandidates.map((candidate, index) => (
            <CandidateCard key={index} {...candidate} />
          ))}
        </div>
      </div>
    </section>
  );
}
function CandidateCard({ name, party, background }: Candidate) {
  return (
    <Card>
      <div className="flex items-center space-x-4 p-4">
        <Image
          alt="Image"
          className="rounded-full"
          height="80"
          src="/placeholder.svg"
          style={{
            aspectRatio: "80/80",
            objectFit: "cover",
          }}
          width="80"
        />
        <CardHeader className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{party}</p>
        </CardHeader>
      </div>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Parcours politique</p>
        <p className="text-sm">{background}</p>
      </CardContent>
      <CardFooter>
        <Link href="#" passHref>
          <Button size="sm">Voir le profil</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
function setfilteredarticles(foo: { name: string; party: string; background: string; }[]) {
  throw new Error("Function not implemented.");
}

