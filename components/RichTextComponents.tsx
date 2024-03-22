import { urlFor } from "@/sanity-client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative my-3">
          <Image
            className="object-contain h-auto mx-auto"
            width={1200}
            height={800}
            src={urlFor(value).url()}
            alt=""
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 my-4 list-disc font-light">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="ml-10 my-4 list-decimal font-light">{children}</ol>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-5xl py-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-4xl py-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl py-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl py-4">{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-xl py-4">{children}</h5>
    ),
    normal: ({ children }: any) => (
      <p className="text-md font-light mb-2">{children}</p>
    ),
    h6: ({ children }: any) => (
      <p className="-mt-2 pb-5 text-center font-thin">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l pl-5 py-5 my-5 font-light">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link href={value.href} rel={rel}>
          <Button variant={"link"}>{children}</Button>
        </Link>
      );
    },
  },
};
