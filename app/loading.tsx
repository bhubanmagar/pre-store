import React from "react";
import Loading from "@/assets/loader.gif";
import Image from "next/image";
const LoadingPage = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <Image src={Loading} alt="loading" width={100} height={100} />
      </div>
    </>
  );
};

export default LoadingPage;
