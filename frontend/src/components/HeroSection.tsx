
"use client";

import Slider from './Slider';

const HeroSection = () => {
  const images = [
    '/images/banner5.jpg',
    '/images/banner6.jpg',
    '/images/banner4.jpg',
  ];

  return (
    <section className="relative h-1/2 overflow-hidden">
      <Slider images={images} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-b from-black/70 to-black/30 backdrop-blur-sm">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-down">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Our Store</span>
        </h1>
        <p className="text-lg md:text-xl font-medium mb-8 max-w-2xl px-4 animate-fade-in-up">
          Discover a world of amazing products curated just for you!
        </p>
        <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition duration-300   ">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;