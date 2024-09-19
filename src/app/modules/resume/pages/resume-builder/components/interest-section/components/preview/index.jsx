import { getInterestData } from "@/redux/resume/actions";
import { Divider, Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const InterestPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { interests } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getInterestData(resume_id));
  }, []);

  if (interests?.length > 0) {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Interests</h1>
        <Divider className="border border-black my-3" />
        <div className="grid grid-cols-2 gap-3">
          {interests?.map((interest) => (
            <div key={interest?.id} className="w-full mb-2">
              <div className="w-full flex items-center gap-3 justify-between">
                <div className="w-full flex-grow">
                  <h1 className="font-bold text-[12px]">{interest?.title}</h1>
                  {interest?.keywords && (
                    <div className="flex flex-wrap gap-1 items-center text-[10px]">
                      {interest?.keywords?.map((keyword) => (
                        <p
                          className="px-2 py-1 mt-1 rounded bg-primary/10 text-primary"
                          key={keyword}
                        >
                          {keyword}
                        </p>
                      ))}
                    </div>
                  )}
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
        <h1 className="text-[14px] font-bold">Interests</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default InterestPreview;
