import Image from "next/image";

interface Props {
  text: string;
  src: string;
  alt?: string;
}

export const ExampleCarouselImage = ({ text, src, alt }: Props) => {
  return (
    <div className="Courasel-element">
      {/* w-screen h-screen */}
      <Image
        src={src}
        alt={alt || text}
        style={{ backgroundColor: "var(--primary-color)" }}
        className="object-contain mx-auto"
        fill
        // className="object-contain object-center"
        priority
      />
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 text-center text-lg md:text-xl">
        {text}
      </div>
    </div>
  );
};
