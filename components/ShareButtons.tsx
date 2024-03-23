"use client";
import { CheckCheck, CopyIcon } from "lucide-react";
import React, { useState } from "react";
import {
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterIcon,
  FacebookIcon,
  EmailIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

const ShareButtons = ({ url }: { url: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }
   // onClick handler function for the copy button
   const handleCopyClick = (copyText: string) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="flex gap-2 items-center">
      Partagez l'article:
      <TwitterShareButton url={url}>
        <TwitterIcon className="h-8 w-8 rounded-sm" />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon className="h-8 w-8 rounded-sm" />
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon className="h-8 w-8 rounded-sm" />
      </LinkedinShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon className="h-8 w-8 rounded-sm" />
      </WhatsappShareButton>
      <EmailShareButton url={url}>
        <EmailIcon className="h-8 w-8 rounded-sm" />
      </EmailShareButton>
      <button className="w-8 h-8 rounded-sm hover:bg-muted border flex justify-center items-center" onClick={() => handleCopyClick(url)}>
      {isCopied ?  <CheckCheck size={14} /> : <CopyIcon size={16} />}
      </button>
    </div>
  );
};

export default ShareButtons;
