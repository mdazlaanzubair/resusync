import { notify } from "@/utils";
import React, { useEffect } from "react";

const ModelInfo = ({ activeKey }) => {
  const llmInfo = [
    {
      key: "gemini-1.5-flash-001",
      label: "Gemini 1.5 Flash",
      children: (
        <p>
          Multimodal model that supports the same input and output types as 1.5
          Pro, but with a long-context understanding of 1 million tokens. Gemini
          1.5 Flash is specifically designed for high-volume, cost-effective
          applications.
        </p>
      ),
    },
    {
      key: "gemini-1.5-pro-001",
      label: "Gemini 1.5 Pro",
      children: (
        <p>
          Multimodal model that supports adding image, audio, video, and PDF
          files in text or chat prompts for a text or code response. Also, it
          supports long-context understanding with 2 million tokens.
        </p>
      ),
    },
  ];

  // FUNCTION TO EXTRACT DATA OF FIELD THAT IS PASSED IN THE PARAMS
  function extractObjectByKey(param) {
    return llmInfo?.map((obj) => obj.key === activeKey && obj[param]);
  }

  useEffect(() => {
    if (activeKey?.length > 0) {
      notify(
        "info",
        extractObjectByKey("label"),
        extractObjectByKey("children"),
        "topRight"
      );
    }
  }, [activeKey]);
};

export default ModelInfo;
