"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ProductImages = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[currentIndex]}
        alt="product images"
        height={1000}
        width={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex">
        {images.map((images, index) => (
          <div
            key={images}
            className={cn(
              "border-2 mr-2 cursor-pointer hover:border-red-600",
              currentIndex == index && "border-red-600"
            )}
            onClick={() => setCurrentIndex(index)}
          >
            <Image src={images} alt="images" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductImages;
