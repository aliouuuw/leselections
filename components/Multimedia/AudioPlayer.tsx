"use client";
import ReactAudioPlayer from "react-audio-player";
import { Separator } from "../ui/separator";

type AudioProps = {
  audios: {
    titre: string;
    description: string;
    source: string;
  }[];
  size?: string,
};

const AudioPlayer = ({ audios, size }: AudioProps) => {
  return (
    <div className="w-full bg-background rounded-lg border ">
      <div className="h-96 snap-y snap-mandatory overflow-scroll" style={{height:`${size}`}}>
        {audios.map((audio, index) => (
          <div key={index} className="snap-start snap-always p-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h4 className="font-medium tracking-tight">{audio.titre}</h4>
              <p className="text-sm text-muted-foreground mt-1 capitalize">{audio.description}</p>
            </div>
            <ReactAudioPlayer src={audio.source} controls />
            {index !== audios.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;
