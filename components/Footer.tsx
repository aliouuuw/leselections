import React from "react";
import { Facebook, Twitter, Linkedin, Mail, Factory, Instagram } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="px-8 md:px-36 border-t py-4">
      <div className="py-4">
        <h4 className="font-[1500px] text-xl my-2">Siège social:</h4>
        <p>
        39 Av. Faidherbe, Dakar, Senegal
        </p>
        <a className="underline hover:text-primary" href="tel:1-905-499-3618">
          +1-905-499-3618
        </a>
        <p>Fax: +1-905-499-3618</p>
        <br />
      </div>
      <div className="mt-8 flex justify-center gap-x-10">
        <a target="_blank" href="https://www.facebook.com/profile.php?id=61555627563552">
          <Facebook size={18} />
        </a>
        <a target="_blank" href="https://x.com/LesElections24?t=2Ag3NR-6i4hX-BSjy-gbBQ&s=09">
          <Twitter size={18} />
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com/les.elections?igsh=MXJ6ZDh4bW55aXZo"
        >
          <Instagram size={18} />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/showcase/les-elections/"
        >
          <Linkedin size={18} />
        </a>
        <a target="_blank" href="mailto: contact@@leselections.info">
          <Mail size={18} />
        </a>
      </div>

      <div className="w-full p-4 text-center font-extralight text-sm">
        Les Elections, Inc. Depuis 2018. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
