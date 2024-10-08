import { getSkillData } from "@/redux/resume/actions";
import { Divider, Empty, Progress } from "antd";
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

  if (skills?.length > 0) {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Skills</h1>
        <Divider className="border border-black my-3" />
        <div className="grid grid-cols-2 gap-3">
          {skills?.map((skill) => (
            <div key={skill?.id} className="w-full mb-2">
              <div className="w-full flex items-center gap-3 justify-between">
                <div className="w-full flex-grow">
                  <h1 className="font-bold text-[12px]">{skill?.title}</h1>
                  <Progress
                    style={{
                      visibility: skill?.level <= 0 ? "hidden" : "",
                    }}
                    percent={(skill?.level * 100) / 5}
                    steps={5}
                    showInfo={false}
                  />
                  <div className="flex flex-wrap gap-1 items-center text-[10px]">
                    {skill?.keywords &&
                      skill?.keywords?.map((keyword) => (
                        <p
                          className="px-2 py-1 mt-2 rounded bg-primary/10 text-primary"
                          key={keyword}
                        >
                          {keyword}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Skills</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default SkillsPreview;
