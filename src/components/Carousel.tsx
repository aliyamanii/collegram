// CustomCarousel.tsx
import React, { useState } from "react";
import next from "../assets/photos/arrow-forward.svg";
import prev from "../assets/photos/arrow-back.svg";
import { Image } from "../types/types";

interface CustomCarouselProps {
  images: Image[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="flex flex-col items-center gap-2 w-[488px] h-[488px] overflow-hidden rounded-3xl"
      dir="ltr"
    >
      <div
        className="w-full h-full flex transition-transform duration-300 rounded-3xl"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index + 1}`}
            className="min-h-full min-w-full object-cover rounded-3xl bg-image-placeholder bg-center"
          />
        ))}
      </div>
      <div className="flex gap-4 items-center">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="bottom-2 right-2 px-2 py-1 z-10 hover:scale-125 transition-all duration-200"
        >
          <img src={prev}></img>
        </button>

        {/* Dot Indicators */}
        <div className=" bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex
                  ? "bg-[#587052]"
                  : "bg-cloud hover:bg-gray-600 cursor-pointer"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
        {/* Next Button */}
        <button
          onClick={handleNext}
          className="bottom-2 right-2 px-2 py-1 z-10 hover:scale-125 transition-all duration-200"
        >
          <img src={next}></img>
        </button>
      </div>
    </div>
  );
};

export default CustomCarousel;
