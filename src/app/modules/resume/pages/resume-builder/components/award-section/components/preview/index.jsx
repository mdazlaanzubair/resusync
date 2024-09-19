import { getAwardData } from "@/redux/resume/actions";
import { Divider, Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AwardsPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { awards } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getAwardData(resume_id));
  }, []);

  if (awards?.length > 0) {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Awards</h1>
        <Divider className="border border-black my-3" />
        {awards?.map((award) => (
          <div key={award?.id} className="w-full mb-2">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="w-full flex-grow">
                <h1 className="font-bold text-[12px]">{`${award?.title}`}</h1>
                <p className="text-[10px]">
                  <span>{award?.awarder}</span>
                  {award?.url && (
                    <>
                      <Divider
                        type="vertical"
                        className="border-[0.5px] border-black/30"
                      />
                      <a
                        href={award?.url}
                        target="_blank"
                        className="text-primary underline underline-offset-2"
                      >
                        View here
                      </a>
                    </>
                  )}
                  {award?.location && (
                    <>
                      <Divider
                        type="vertical"
                        className="border-[0.5px] border-black/30"
                      />
                      <span className="text-[10px]">{award?.location}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="w-fit text-[11px] text-right">
                <p className="text-nowrap">{award?.date}</p>
              </div>
            </div>
            {award?.summary && (
              <p className="w-full text-[11px] mt-2">{award?.summary}</p>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Awards</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default AwardsPreview;
