import Image from "next/image";

interface Props {
  text: string;
  src: string;
  alt?: string;
}

export const CustomImage = ({ text, src, alt }: Props) => {
  return (
    <div className="relative h-full">
      <Image
        src={src}
        alt={alt || text}
        // className="CustomImage"
        className="object-contain mx-auto"
        fill
        priority
      />
    </div>
  );
};
