import { getSkillData } from "@/redux/resume/actions";
import { Divider, Progress } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SkillsPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { skills } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getSkillData(resume_id));
  }, []);

  return (
    <div className="w-full mt-4 mb-2">
      <h1 className="text-xl font-bold">Skills</h1>
      <Divider className="border border-black my-3" />
      <div className="grid grid-cols-2 gap-3">
        {skills?.map((skill) => (
          <div key={skill?.id} className="w-full mb-2">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="w-full flex-grow">
                <h1 className="font-bold text-sm">{skill?.title}</h1>
                <Progress
                  style={{
                    visibility: skill?.level <= 0 ? "hidden" : "",
                  }}
                  percent={(skill?.level * 100) / 5}
                  steps={5}
                  showInfo={false}
                />
                {skill?.keywords &&
                  skill?.keywords?.map((keyword) => (
                    <p className="w-full text-sm mt-3" key={keyword}>
                      {keyword}
                    </p>
                  ))}
                <div className="flex flex-wrap gap-1 items-center text-xs">
                  {[
                    "html",
                    "css",
                    "js",
                    "react",
                    "html",
                    "css",
                    "js",
                    "react",
                    "html",
                    "css",
                    "js",
                    "react",
                    "html",
                    "css",
                    "js",
                    "react",
                    "html",
                    "css",
                    "js",
                    "react",
                    "html",
                    "css",
                    "js",
                    "react",
                    "html",
                    "css",
                    "js",
                    "react",
                  ]?.map((keyword) => (
                    <span
                      className="px-2 py-1 rounded-md bg-secondary"
                      key={keyword}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPreview;
