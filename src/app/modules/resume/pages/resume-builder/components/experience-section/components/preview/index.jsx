import { getExperienceData } from "@/redux/resume/actions";
import { Divider, Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ExperiencePreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { experiences } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getExperienceData(resume_id));
  }, []);

  if (experiences?.length > 0) {
    return (
      <div className="w-full mt-4 mb-2">
        <h1 className="text-xl font-bold">Experience</h1>
        <Divider className="border border-black my-3" />
        {experiences?.map((exp) => (
          <div key={exp?.id} className="w-full mb-2">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="w-full flex-grow">
                <h1 className="font-bold text-sm">{exp?.position}</h1>
                <p className="text-xs">
                  {exp?.url ? (
                    <a
                      href={exp?.url}
                      target="_blank"
                      className="text-primary underline underline-offset-2"
                    >{`@ ${exp?.company}`}</a>
                  ) : (
                    <span>{exp?.company}</span>
                  )}
                  {exp?.location && (
                    <>
                      <Divider
                        type="vertical"
                        className="border-[0.5px] border-black/30"
                      />
                      <span>{exp?.location}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="w-fit text-xs">
                <span className="text-nowrap">{exp?.date}</span>
              </div>
            </div>
            {exp?.summary && (
              <p className="w-full text-sm mt-3">{exp?.summary}</p>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full mt-4 mb-2">
        <h1 className="text-xl font-bold">Experience</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default ExperiencePreview;
