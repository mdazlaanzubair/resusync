import React, { useState, useEffect } from "react";
import { ShowLottie } from "..";
import { connectionError } from "@/assets";

const NoInternetConnectionWrapper = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (isOnline) {
    return children;
  }

  return (
    <div
      className={`fixed z-50 top-0 bottom-0 left-0 right-0 bg-secondary flex flex-col items-center justify-center text-center`}
    >
      <ShowLottie animationData={connectionError} />
      <h1 className="text-lg animate-pulse font-bold">No Internet Connection</h1>
    </div>
  );
};

export default NoInternetConnectionWrapper;
