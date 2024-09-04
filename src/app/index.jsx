import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";

function AppRoot() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#f5f5f5",
        },
      }}
    >
      <div className="relative">
        <Outlet />
      </div>
    </ConfigProvider>
  );
}

export default AppRoot;
