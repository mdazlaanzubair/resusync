import { Button, ConfigProvider, Space } from "antd";
import { Outlet } from "react-router-dom";

function AppRoot() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#f0f5ff",
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
