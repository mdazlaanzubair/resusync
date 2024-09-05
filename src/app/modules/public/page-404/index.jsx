import { error404 } from "@/assets";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { Button } from "antd";
import React from "react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { TbSignature } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { userId, isSignedIn, isLoaded } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row w-full mx-auto h-[100vh] items-center justify-center">
      <div className="w-full h-full flex flex-col items-end justify-center lg:w-2/3 p-0">
        <img
          className="w-full object-fill"
          src={error404}
          alt="error-404-page"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center lg:w-1/2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
          Oops!
        </h1>
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight mb-5">
          We couldn't find that page.
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3">
          Maybe you can find what you need here!
        </h4>
        <div className="flex items-center w-full gap-1">
          <Button
            variant="primary"
            className="gap-1"
            onClick={() =>
              navigate(-1)
            }
          >
            <HiOutlineHomeModern /> Home
          </Button>
          {userId && isSignedIn && isLoaded && (
            <Button
              variant="secondary"
              className="gap-1"
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              <LuLogOut />
              Logout
            </Button>
          )}
          {isLoaded && !userId && !isSignedIn && (
            <>
              <Button
                variant="secondary"
                className="gap-1"
                onClick={() => navigate("/auth/login")}
              >
                <LuLogIn />
                Login
              </Button>
              <Button
                variant="secondary"
                className="gap-1"
                onClick={() => navigate("/auth/register")}
              >
                <TbSignature />
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
