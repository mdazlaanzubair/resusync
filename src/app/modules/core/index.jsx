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
      <div className="flex flex-col w-full h-[100vh] gap- bg-secondary">
        {/* Top Navigation */}
        <Header showMenu={isShowMenu} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <div className="w-full flex flex-grow overflow-auto">
          {/* Main Layout with Sidebar and Content */}
          <Sidebar showMenu={isShowMenu} toggleSidebar={toggleSidebar} />

          <div className="w-full flex flex-col flex-grow">
            <div className="relative p-5 flex flex-col gap-2 w-full h-full overflow-y-auto">
              {/* <BreadcrumbComponent /> */}
              <Outlet />
            </div>
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </RouteProtector>
  );
};

export default ProtectedCoreAppLayout;
