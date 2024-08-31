import { Button } from "antd";
import React from "react";
import { fullLogo } from "@/assets";
import { FaRegUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";

const Header = ({ isShow, toggleSidebar }) => {
  return (
    <div className="w-full flex border-b items-center justify-between px-5 py-3 bg-white">
      <img className="w-28 lg:w-36 h-auto" src={fullLogo} alt="" srcSet="" />
      {/* SPACER */}
      <div className="flex-grow"></div>
      <div className="flex items-center justify-center gap-1">
        <Button type="text" size="large" icon={<FaRegUser />} />
        <Button
          onClick={toggleSidebar}
          className="flex lg:hidden"
          type="text"
          size="large"
          icon={
            isShow ? (
              <IoClose className="text-xl" />
            ) : (
              <TbMenuDeep className="text-xl" />
            )
          }
        />
      </div>
    </div>
  );
};

export default Header;
