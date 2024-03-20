"use client"
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type VideoProps = {
    source: string;
    titre: string;
    type: string;
  };

const VideoPlayer = ({ source, titre, type }: VideoProps) => {
  return (
    <div className='w-full'>
      <ReactPlayer url={source} controls={true} width={"100%"} /> 
      <div className="rounded-t-lg p-4">
        <h2 className="text-lg font-medium tracking-tight">{titre}</h2>
        <p className="text-sm text-muted-foreground mt-1 capitalize">{type}</p>
      </div>
    </div>
  )
}

export default VideoPlayer
