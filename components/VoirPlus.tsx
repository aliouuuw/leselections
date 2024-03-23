import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

type VoirPlusProps = {
  url: string
}

const VoirPlus = ({url}: VoirPlusProps) => {
  return (
    <div className="px-4 py-6 flex items-center justify-center w-full">
      <div className="border-t w-full" />
      <Link className="font-semibold mx-2" href={`${url}`}>
        <Button>Voir tout</Button>
      </Link>
      <div className="border-t w-full" />
    </div>
  )
}

export default VoirPlus
