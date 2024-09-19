import { getEducationData } from "@/redux/resume/actions";
import { Divider, Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EducationPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { educations } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getEducationData(resume_id));
  }, []);

  if (educations?.length > 0) {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Education</h1>
        <Divider className="border border-black my-3" />
        {educations?.map((edu) => (
          <div key={edu?.id} className="w-full mb-2">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="w-full flex-grow">
                <h1 className="font-bold text-[12px]">{`${edu?.study_type} - ${edu?.field}`}</h1>
                <p className="text-[10px]">
                  {edu?.url ? (
                    <a
                      href={edu?.url}
                      target="_blank"
                      className="text-primary underline underline-offset-2"
                    >{`@ ${edu?.institute}`}</a>
                  ) : (
                    <span>{edu?.institute}</span>
                  )}
                </p>
              </div>
              <div className="w-fit text-[11px] text-right">
                <p className="text-nowrap">{edu?.date}</p>
                {edu?.score && (
                  <strong className="text-nowrap">{edu?.score}</strong>
                )}
              </div>
            </div>
            {edu?.summary && (
              <p className="w-full text-[11px] mt-2">{edu?.summary}</p>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Education</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default EducationPreview;
