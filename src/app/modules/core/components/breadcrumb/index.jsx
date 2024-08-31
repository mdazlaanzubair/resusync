import { Breadcrumb } from "antd";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";

const BreadcrumbComponent = () => {
  const breadcrumbItems = location.pathname
    .split("/")
    .filter((path) => path) // remove empty strings
    .map((path, index, array) => ({
      key: index,
      title:
        path === "dashboard" ? (
          <AiOutlineHome />
        ) : (
          path.charAt(0).toUpperCase() + path.slice(1)
        ),
      href: `/${array.slice(0, index + 1).join("/")}`,
    }));

  return <Breadcrumb className="pl-3" separator=">" items={breadcrumbItems} />;
};

export default BreadcrumbComponent;
