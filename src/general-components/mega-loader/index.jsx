import React from "react";

const MegaLoader = ({
  children,
  message = "Please wait while its loading...",
  isTransparent = false,
}) => {
  return (
    <div
      className={`fixed z-50 top-0 bottom-0 left-0 right-0 ${
        isTransparent ? "bg-secondary/85" : "bg-secondary"
      } flex flex-col items-center justify-center text-center`}
    >
      {children}
      <h1 className="text-sm animate-pulse">{message}</h1>
    </div>
  );
};

export default MegaLoader;
