import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { GrCloudUpload } from "react-icons/gr";

const ModalBtn = ({ isUploadBtn = false, clickHandler }) => {
  return (
    <div
      onClick={(e) => clickHandler && clickHandler(e)}
      className="group relative flex flex-col w-full h-[200px] border rounded-lg cursor-pointer overflow-hidden"
    >
      <BGPattern
        isUploadBtn={isUploadBtn}
        backgroundColor={
          isUploadBtn ? "rgba(102, 166, 255, 0.5)" : "rgba(33, 147, 176, 0.5)"
        }
      />
      <div className="absolute left-0 right-0 bottom-0  group-hover:pb-2 bg-white text-left p-1 pl-2 backdrop-blur-sm bg-opacity-70 transition-all ease-in-out duration-300">
        <sub className="font-semibold text-xs block mb-1">
          {isUploadBtn ? "Import an existing resume" : "Create a new resume"}
        </sub>
        <sup className="text-xs text-black/50">
          {isUploadBtn ? "Parsable PDFs only" : "Start building from scratch"}
        </sup>
      </div>
    </div>
  );
};

export default ModalBtn;

// Dot pattern URL
const pattern = `
url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.5'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const BGPattern = ({ backgroundColor, isUploadBtn }) => (
  <div
    className="relative flex h-full bg-red-300 rounded-lg"
    style={{
      backgroundColor: `${backgroundColor}`,
      backgroundImage: `${pattern}`,
      backgroundBlendMode: "multiply", // Blend the gradient and pattern
    }}
  >
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      {isUploadBtn ? (
        <GrCloudUpload className="text-3xl" />
      ) : (
        <GoPlus className="text-4xl" />
      )}
    </div>
  </div>
);
