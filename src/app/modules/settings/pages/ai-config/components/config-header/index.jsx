import { Tooltip } from "antd";
import React from "react";

const ConfigHeader = () => {
  return (
    <div className="mb-5">
      <h1 className="font-bold text-lg">Configurations</h1>
      <p className="text-sm">
        Currently <strong>ResuSync</strong> only supports{" "}
        <Tooltip
          overlayInnerStyle={{
            fontSize: ".7rem",
          }}
          title="Gemini is a large language model (LLM) developed by Google DeepMind. It's designed to be versatile and capable of performing a wide range of tasks."
        >
          <a
            href="https://deepmind.google/technologies/gemini/"
            target="_blank"
            className="font-bold text-primary underline underline-offset-2"
          >
            Gemini Models
          </a>
        </Tooltip>{" "}
        powered by{" "}
        <Tooltip
          overlayInnerStyle={{
            fontSize: ".7rem",
          }}
          title="Google DeepMind is a subsidiary of Alphabet Inc. (Google's parent company) that specializes in artificial intelligence research."
        >
          <a
            href="https://deepmind.google/"
            target="_blank"
            className="font-bold text-primary underline underline-offset-2"
          >
            Google DeepMind
          </a>
        </Tooltip>
      </p>
    </div>
  );
};

export default ConfigHeader;
