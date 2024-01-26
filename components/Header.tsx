import React from 'react'
import { ModeToggle } from './ui/modeToggle'
import Image from 'next/image'
import icon from '../app/icon.png'

export default function Header() {
  return (
    <nav className="flex justify-between items-center h-fit">
        <div className="flex items-center">
            <Image
              src={icon}
              width={80}
              alt='Les éléctions logo'
            />
        </div>
        <ModeToggle/>
    </nav>
  )
}
