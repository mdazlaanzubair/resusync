import { profileSearch } from "@/assets";
import { ShowLottie, MegaLoader } from "@/general-components";
import { useAuth } from "@clerk/clerk-react";
import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const RouteProtector = ({ children }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // IF NOT LOADED SHOW LOADER
  if (!isLoaded) {
    return (
      <MegaLoader>
        <ShowLottie animationData={profileSearch} />
      </MegaLoader>
    );
  }

  // IF NO USER ID REDIRECT
  useLayoutEffect(() => {
    if (!isSignedIn && !userId && isLoaded) {
      navigate("/auth/login", { replace: true });
    }
  }, [isLoaded]);
  
  return <>{children}</>;
};

export default RouteProtector;
