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
      <div className="w-full mt-4 mb-2">
        <h1 className="text-xl font-bold">Awards</h1>
        <Divider className="border border-black my-3" />
        {awards?.map((award) => (
          <div key={award?.id} className="w-full mb-2">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="w-full flex-grow">
                <h1 className="font-bold text-sm">{`${award?.title}`}</h1>
                <p className="text-xs">
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
                      <span>{award?.location}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="w-fit text-xs text-right">
                <p className="text-nowrap">{award?.date}</p>
              </div>
            </div>
            {award?.summary && (
              <p className="w-full text-sm mt-3">{award?.summary}</p>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full mt-4 mb-2">
        <h1 className="text-xl font-bold">Awards</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default AwardsPreview;
