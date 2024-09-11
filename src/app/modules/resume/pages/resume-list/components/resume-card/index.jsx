import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Button, Dropdown, Tooltip, Typography } from "antd";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdDocumentScanner } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { PiRankingFill } from "react-icons/pi";
import { HiMiniTrash } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { resumeParser } from "@/utils";
import { resumeActions } from "@/redux/resume/slice";
import { useNavigate } from "react-router-dom";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

const ResumeCards = ({
  backgroundColor,
  data,
  selectResumeDataHandler,
  selectAndNavigateHandler,
  deleteResumeHandler,
}) => {
  const { llmConfigs } = useSelector((state) => state.llmConfig);
  const { id: api_key_id } = llmConfigs;
  const { id: resume_id, user_id } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const parserFunctionInvoker = async () => {
    setIsLoading(true);
    const callback = async (isSuccess) => {
      if (isSuccess) {
        await dispatch(resumeActions.selectResume(data));
        navigate(`/resumes/builder/${data?.id}`);
      }
      setIsLoading(false);
    };
    dispatch(resumeParser(api_key_id, user_id, resume_id, callback));
  };

  const items = [
    {
      key: "1",
      label: <span className="text-xs">Edit</span>,
      icon: <RiEdit2Fill />,
      onClick: selectResumeDataHandler,
    },
    !data?.isParsed &&
      data?.file_path?.length > 0 &&
      data?.raw_text?.length > 0 && {
        key: "2",
        label: <span className="text-xs">Parse Resume</span>,
        icon: <MdDocumentScanner />,
        onClick: () => parserFunctionInvoker(),
      },
    {
      key: "3",
      label: <span className="text-xs">ATS Analysis</span>,
      icon: <PiRankingFill />,
      onClick: () => alert(`ATS Analysis of ${data?.title}`),
    },
    {
      key: "4",
      label: <span className="text-xs">Delete</span>,
      icon: <HiMiniTrash />,
      onClick: deleteResumeHandler,
    },
  ];

  return (
    <div className="relative group flex flex-col w-full h-[200px] border rounded-lg hover:shadow">
      <BGPattern
        backgroundColor={backgroundColor}
        clickHandler={selectAndNavigateHandler}
      />
      <div className="w-full flex items-center justify-between gap-3">
        <div className="py-2 pl-2 flex flex-col group-hover:py-3 transition-all ease-in-out duration-300">
          <Tooltip
            placement="top"
            title={data?.title}
            overlayInnerStyle={{
              fontSize: "0.75rem",
            }}
          >
            <p className="font-semibold text-xs m-0 p-0 cursor-pointer">
              {data?.title?.slice(0, 17) + "..."}
            </p>
          </Tooltip>

          <Tooltip
            placement="bottom"
            title={`Last updated ${dayjs(data?.created_at).fromNow()}`}
            overlayInnerStyle={{
              fontSize: "0.7rem",
            }}
          >
            <Typography.Text
              className="font-light text-[0.6rem] m-0 p-0 cursor-pointer"
              ellipsis
            >
              {`Updated ${dayjs(data?.created_at).fromNow()}`?.slice(0, 17) +
                "..."}
            </Typography.Text>
          </Tooltip>
        </div>

        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          placement="bottomRight"
          disabled={isLoading}
        >
          <Button
            loading={isLoading}
            disabled={isLoading}
            size="small"
            type="text"
            className="mr-2"
            icon={<HiDotsHorizontal />}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default ResumeCards;

// Dot pattern URL
const pattern = `
url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.5'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const BGPattern = ({ backgroundColor, clickHandler }) => (
  <div
    onClick={(e) => clickHandler && clickHandler(e)}
    className="relative flex h-full rounded-lg cursor-pointer"
    style={{
      backgroundColor: `${backgroundColor}`,
      backgroundImage: `${pattern}`,
      backgroundBlendMode: "multiply", // Blend the gradient and pattern
    }}
  >
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <IoDocumentTextOutline className="text-3xl" />
    </div>
  </div>
);
