import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

const RatioNextImage = ({ src, alt }: Props) => {
  return (
    <Image
      src={src}
      alt={alt}
      quality={100}
      fill
      className="object-contain"
      sizes="(min-width: 1040px) calc(50vw - 202px), (min-width: 780px) calc(100vw - 338px), calc(100vw - 114px)"
    />
  );
};

export default RatioNextImage;
