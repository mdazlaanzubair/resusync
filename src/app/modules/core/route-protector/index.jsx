import MegaLoader from "@/general-components/mega-loader";
import { useAuth } from "@clerk/clerk-react";
import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const RouteProtector = ({ children }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // IF NO USER ID REDIRECT
  useLayoutEffect(() => {
    if (!isSignedIn && !userId) {
      navigate("/auth/login");
    }
  }, [isLoaded]);

  // IF NOT LOADED SHOW LOADER
  if (!isLoaded) {
    return <MegaLoader />;
  }
  return <>{children}</>;
};

export default RouteProtector;
