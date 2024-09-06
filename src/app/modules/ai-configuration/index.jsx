import { Tooltip } from "antd";
import React, { useState } from "react";
import { ConfigForm, ConfigHeader, ModelInfo } from "./components";

const AIConfigurationModule = () => {
  const [selectedModelKey, setSelectedModelKey] = useState(
    "gemini-1.5-flash-001"
  );
  return (
    <div className="w-full h-full rounded-lg bg-[#ffffff] p-10 overflow-y-auto">
      <ConfigHeader />
      <div className="flex flex-col-reverse lg:flex-row lg:items-start gap-5">
        <ConfigForm setModelKey={setSelectedModelKey} />
        <ModelInfo activeKey={selectedModelKey} />
      </div>
    </div>
  );
};

export default AIConfigurationModule;
