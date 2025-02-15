"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";

const NotFoundPage = () => {
  const [position, setPosition] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e) => {
    setPosition({ x: `${e.clientX}px`, y: `${e.clientY}px` });
  };
  return (
    <div>
      <div
        className="relative w-full h-screen bg-black text-white overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Blurred Overlay */}
        <motion.div
          className="absolute inset-0 backdrop-blur-3xl bg-black z-10 opacity-80 "
          style={{
            WebkitMaskImage: `radial-gradient(circle 300px at ${position.x} ${position.y}, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 50%)`,
            maskImage: `radial-gradient(circle 300px at ${position.x} ${position.y}, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 50%)`,
          }}
        />

        {/* Page Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-[28vw] font-bold -mt-10 text-red-900">404</h1>
          <p className="-mt-28 text-xl ">Oops! Page Not Found</p>
          <p className="text-gray-400">Move your cursor to reveal</p>
        </div>
        <div className="absolute inset-0 left-1/2 text-white my-10 z-20 top-3/4 mt-24">
          <Link href="/">Go back ⬅ </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
