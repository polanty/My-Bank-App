import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedImageProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

const AnimatedImageScroll = ({
  src,
  alt = "Mobile image",
  className = "",
}: AnimatedImageProps) => {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        {
          opacity: 0,
          y: 150,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={imgRef} className={`relative h-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        className="object-contain mx-auto"
        fill
        priority
      />
    </div>
  );
};

export default AnimatedImageScroll;
