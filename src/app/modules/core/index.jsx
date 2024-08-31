import React from "react";
import MegaLoader from "@/general-components/mega-loader";
import { useAuth } from "@clerk/clerk-react";
import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedCoreAppLayout = () => {
  const authObj = useAuth();
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  console.log("Auth Obj:", authObj);

  // IF NO USER ID REDIRECT
  useLayoutEffect(() => {
    if (isLoaded && !userId) {
      navigate("/auth/login");
    }
  }, [isLoaded]);

  // IF NOT LOADED SHOW LOADER
  if (!isLoaded) {
    return <MegaLoader />;
  }

  // ELSE RENDER THE REQUESTED PAGE
  return (
    <div className="relative flex flex-col w-full h-[100vh] bg-secondary">
      <Outlet />
    </div>
  );
};

export default ProtectedCoreAppLayout;
