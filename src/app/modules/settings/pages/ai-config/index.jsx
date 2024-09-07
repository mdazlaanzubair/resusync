import React, { useState } from "react";
import { ConfigForm, ConfigHeader, ModelInfo } from "./components";

const AIConfigPage = () => {
  const [selectedModelKey, setSelectedModelKey] = useState(
    "gemini-1.5-flash-001"
  );
  return (
    <div className="w-full h-full">
      <ConfigHeader />
      <div className="flex flex-col-reverse lg:flex-row lg:items-start gap-5">
        <ConfigForm setModelKey={setSelectedModelKey} />
        <ModelInfo activeKey={selectedModelKey} />
      </div>
    </div>
  );
};

export default AIConfigPage;
