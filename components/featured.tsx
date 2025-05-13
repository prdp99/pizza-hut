'use client'
import Image from "next/image";
import { useState } from "react";

function Featured() {
  const [index, setIndex] = useState(0);

  const images = [
    "/img/featured-oo.png",
    "/img/second.png",
    "/img/third-o.png",
  ];

  const handleArrow = (direction: string) => {
    if (direction === "1") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "2") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className="relative h-[80vh] bg-[#d1411e] overflow-hidden md:h-[70vh]">
      {/* Left Arrow */}
      <div
        className="absolute top-0 bottom-0 m-auto w-[10%] h-[20%] cursor-pointer z-2 left-0"
        onClick={() => handleArrow("1")}
      >
        <Image
          src="/img/arrowl.png"
          alt="Left Arrow"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Image Wrapper */}
      <div
        className="flex w-[300vw] h-full transition-transform duration-[1.5s] ease-in-out"
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, idx) => (
          <div className="relative w-screen h-full" key={idx}>
            <Image
              src={img}
              alt={`Featured Image ${idx + 1}`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <div
        className="absolute top-0 bottom-0 m-auto w-[10%] h-[20%] cursor-pointer z-2 right-0"
        onClick={() => handleArrow("2")}
      >
        <Image
          src="/img/arrowr.png"
          alt="Right Arrow"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

export default Featured;