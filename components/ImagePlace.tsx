import Image from 'next/image';
import React from 'react'

type ImageProps = {
    source: string;
    titre: string;
    type: string;
  };

const ImagePlace = ({ source, titre, type }: ImageProps) => {
  return (
    <div className='w-full'>
      <div className='w-full'>
    <Image src={source} alt={titre} className='w-full' height={100} width={100} quality={100}/> 
      </div>
    <div className="rounded-t-lg p-4">
      <h2 className="text-lg font-medium tracking-tight">{titre}</h2>
      <p className="text-sm text-muted-foreground mt-1 capitalize">{type}</p>
    </div>
  </div>
  )
}

export default ImagePlace
