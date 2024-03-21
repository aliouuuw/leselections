import React from "react";
import { Facebook, Twitter, Linkedin, Mail, Factory, Instagram } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="px-8 md:px-36 border-t py-4">
      <div className="py-4">
        <h3 className="font-black my-2">Service commercial:</h3>
        <p>
        Dakar, Senegal. Afrique
        </p>
        <a className="font-black text-primary hover:underline" href="tel:33-7-53-62-03-55">
          +33 7 53 62 03 55
        </a>
        <br />
        <div>
        <h3 className="font-black my-2">Rédaction/Contributions:</h3>
         <p>
          Email: <a target="_blank" href="mailto: contact@@leselections.info"><span className="font-black text-primary hover:underline">afriquelections@gmail.com</span></a>
         </p>
        </div>
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
