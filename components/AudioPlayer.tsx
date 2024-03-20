"use client";
import ReactAudioPlayer from "react-audio-player";

type AudioProps = {
  source: any;
  titre: string;
  type: string;
};

export default function AudioPlayer({ source, titre, type }: AudioProps) {
  return (
    <div className="w-full rounded-lg border ">
      <div className="bg-muted p-4 flex items-center gap-4">
        <ReactAudioPlayer src={source} controls />
      </div>
      <div className="rounded-t-lg p-4">
        <h2 className="text-lg font-medium tracking-tight">{titre}</h2>
        <p className="text-sm text-muted-foreground mt-1 capitalize">{type}</p>
      </div>
    </div>
  );
}
