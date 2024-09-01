import MegaLoader from "@/general-components/mega-loader";
import { useClerk } from "@clerk/clerk-react";
import React from "react";
import { Outlet } from "react-router-dom";
import { spinner } from "@/assets";
import { ShowLottie } from "@/general-components";

const AuthenticationModule = () => {
  const { loaded } = useClerk();

  return (
    <div className="relative flex flex-col bg-primary w-full h-[100vh] items-center justify-center">
      <div className="absolute bg-secondary/30 w-[70vh] h-[70vh] rounded-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-pulse"></div>
      <div className="absolute bg-secondary/20 w-[80vh] h-[80vh] rounded-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-pulse"></div>
      <div className="absolute bg-secondary/10 w-[90vh] h-[90vh] rounded-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-pulse"></div>
      {loaded ? (
        <Outlet />
      ) : (
        <MegaLoader>
          <ShowLottie animationData={spinner} />
        </MegaLoader>
      )}
    </div>
  );
};

export default AuthenticationModule;
