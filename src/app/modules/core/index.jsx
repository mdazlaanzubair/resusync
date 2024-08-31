import React, { useCallback, useState } from "react";
import MegaLoader from "@/general-components/mega-loader";
import { useAuth } from "@clerk/clerk-react";
import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Header, Sidebar } from "./components";

const ProtectedCoreAppLayout = () => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [isShowMenu, setIsShowMenu] = useState(false);

  const toggleSidebar = useCallback(() => setIsShowMenu((prev) => !prev), []);

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

  // ELSE RENDER THE REQUESTED PAGE
  return (
    <div className="flex flex-col w-full h-[100vh] gap- bg-secondary">
      {/* Top Navigation */}
      <Header isShow={isShowMenu} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="w-full flex flex-grow overflow-auto">
        {/* Main Layout with Sidebar and Content */}
        <Sidebar isShow={isShowMenu} toggleSidebar={toggleSidebar} />

        <div className="w-full flex flex-col flex-grow overflow-y-auto">
          <div className="relative p-5 flex flex-col w-full h-full bg-white">
            <Outlet />
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProtectedCoreAppLayout;
