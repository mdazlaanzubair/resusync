import { getReferenceData } from "@/redux/resume/actions";
import { Divider } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ReferencePreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { references } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getReferenceData(resume_id));
  }, []);

  return (
    <div className="w-full mt-4 mb-2">
      <h1 className="text-xl font-bold">References</h1>
      <Divider className="border border-black my-3" />
      <div className="grid grid-cols-2 gap-3">
        {references?.map((reference) => (
          <div key={reference?.id} className="w-full mb-2">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="w-full flex-grow">
                <h1 className="font-bold text-sm">{reference?.name}</h1>
                <p className="text-xs">
                  <span>{reference?.designation}</span>
                  <Divider
                    type="vertical"
                    className="border-[0.5px] border-black/30"
                  />
                  <a
                    href={`mailto:${reference?.email}`}
                    className="text-primary underline underline-offset-2"
                  >
                    {reference?.email}
                  </a>
                  {reference?.phone && (
                    <>
                      <Divider
                        type="vertical"
                        className="border-[0.5px] border-black/30"
                      />
                      <span>{reference?.phone}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferencePreview;
