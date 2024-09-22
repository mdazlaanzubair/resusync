import { getAIConfig } from "@/redux/llm-config/actions";
import { useUser } from "@clerk/clerk-react";
import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

function AppRoot() {
  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.id) {
      dispatch(getAIConfig(user?.id));
    }
  }, [user]);

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
