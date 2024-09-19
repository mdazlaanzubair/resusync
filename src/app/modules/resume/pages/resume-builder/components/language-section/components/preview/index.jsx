import { getLanguageData } from "@/redux/resume/actions";
import { Divider, Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const LanguagesPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { languages } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getLanguageData(resume_id));
  }, []);

  if (languages?.length > 0) {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Languages</h1>
        <Divider className="border border-black my-3" />
        <div className="grid grid-cols-2 gap-3">
          {languages?.map((language) => (
            <div key={language?.id} className="w-full mb-2">
              <div className="w-full flex items-center gap-3 justify-between">
                <div className="w-full flex-grow">
                  <h1 className="font-bold text-[12px]">{language?.name}</h1>
                  <p className="text-[10px]">
                    <span>{language?.proficiency}</span>
                  </p>
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
        <h1 className="text-[14px] font-bold">Languages</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default LanguagesPreview;
