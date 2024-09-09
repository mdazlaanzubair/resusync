import React, { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { BreadcrumbComponent, Footer, Header, Sidebar } from "./components";
import RouteProtector from "./route-protector";

const ProtectedCoreAppLayout = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const toggleSidebar = useCallback(() => setIsShowMenu((prev) => !prev), []);

  // ELSE RENDER THE REQUESTED PAGE
  return (
    <RouteProtector>
      <div className="flex flex-col w-full h-auto items-center justify-between">
        {/* Top Navigation */}
        <Header showMenu={isShowMenu} toggleSidebar={toggleSidebar} />

        <div className="w-full min-h-[100vh] flex flex-col flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </RouteProtector>
  );
};

export default ProtectedCoreAppLayout;
