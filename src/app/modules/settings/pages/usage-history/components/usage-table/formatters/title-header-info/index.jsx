import { Tooltip } from "antd";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const TitleHeaderWithInfo = ({
  title = "Enter you title",
  tooltip_text = "What will be the tooltip text?",
}) => {
  return (
    <span className="flex items-center gap-2">
      {title}
      <Tooltip
        className="cursor-pointer"
        title={tooltip_text}
        placement="top"
        overlayClassName="text-xs"
      >
        <FaExclamationCircle className="text-blue-400" />
      </Tooltip>
    </span>
  );
};

export default TitleHeaderWithInfo;
