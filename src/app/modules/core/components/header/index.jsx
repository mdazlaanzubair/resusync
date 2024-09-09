import React from "react";
import { fullLogo } from "@/assets";
import { Topbar } from "..";
import UserProfileButton from "../user-profile-button";

const Header = () => {
  return (
    <div className="w-full h-fit flex border-b items-center justify-between px-5 pt-3 bg-white">
      <img className="w-28 lg:w-36 mb-3" src={fullLogo} />
      {/* SPACER */}
      <div className="flex-grow text-center">
        <Topbar />
      </div>
      <div className="flex items-center justify-center gap-1">
        <UserProfileButton />
      </div>
    </div>
  );
};

export default Header;
