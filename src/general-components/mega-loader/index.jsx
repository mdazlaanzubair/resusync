import React from "react";
import { ShowLottie } from "..";
import { profileSearch } from "@/assets";

const MegaLoader = () => {
  return (
    <div className="fixed z-50 top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center text-center bg-secondary/85">
      <ShowLottie animationData={profileSearch} />
      <h1 className="text-sm animate-pulse">Please wait...</h1>
    </div>
  );
};

export default MegaLoader;
