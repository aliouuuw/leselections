import React from "react";
import { Twitter, Youtube, Linkedin, Mail } from "lucide-react";
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
        <div className="flex flex-col">
          <Link href="/privacy" legacyBehavior passHref>
            <a target="_blank" className="text-primary hover:underline">
            Conditions d&apos;utilisation
            </a>
          </Link>
          <Link href="/terms" legacyBehavior passHref>
            <a target="_blank" className="text-primary hover:underline">
            Politique de confidentialité
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-x-10">
        <a target="_blank" href="https://twitter.com/BBA_analytics">
          <Twitter size={18} />
        </a>
        <a
          target="_blank"
          href="https://www.youtube.com/channel/UCUPlBMdE7ILLefL2ICW38Kw/"
        >
          <Youtube size={18} />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/company/bankingbook-analytics/"
        >
          <Linkedin size={18} />
        </a>
        <a target="_blank" href="mailto: contact@@bbafintech.com">
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
