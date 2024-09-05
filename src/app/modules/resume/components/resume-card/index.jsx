import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

// Dot pattern URL
const pattern = `
url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.5'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const ResumeCards = ({ backgroundColor, data, selectResumeDataHandler }) => {
  return (
    <div
      className="flex flex-col w-full h-[200px] border rounded-lg hover:shadow cursor-pointer"
      onClick={() => alert("I'll take you to the resume builder!")}
    >
      <div
        className="flex h-full rounded-t-lg"
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `${pattern}`,
          backgroundBlendMode: "multiply", // Blend the gradient and pattern
        }}
      />
      <div className="p-1 pl-2">
        <sub className="font-semibold text-xs block mb-1">{data?.title}</sub>
        <sup className="text-xs text-black/50">
          Last updated {dayjs(data?.created_at).fromNow()}
        </sup>
      </div>
    </div>
  );
};

export default ResumeCards;
