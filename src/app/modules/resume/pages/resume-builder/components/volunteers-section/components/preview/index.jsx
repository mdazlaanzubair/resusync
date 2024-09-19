import { getVolunteerData } from "@/redux/resume/actions";
import { Divider, Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const VolunteersPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { volunteers } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getVolunteerData(resume_id));
  }, []);

  if (volunteers?.length > 0) {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Volunteer</h1>
        <Divider className="border border-black my-3" />
        {volunteers?.map((volunteer) => (
          <div key={volunteer?.id} className="w-full mb-2">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="w-full flex-grow">
                <h1 className="font-bold text-[12px]">{volunteer?.role}</h1>
                <p className="text-[10px]">
                  {volunteer?.url ? (
                    <a
                      href={volunteer?.url}
                      target="_blank"
                      className="text-primary underline underline-offset-2"
                    >{`@ ${volunteer?.organization}`}</a>
                  ) : (
                    <span>{volunteer?.organization}</span>
                  )}
                  {volunteer?.location && (
                    <>
                      <Divider
                        type="vertical"
                        className="border-[0.5px] border-black/30"
                      />
                      <span className="text-[10px]">{volunteer?.location}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="w-fit text-[11px]">
                <span className="text-nowrap">{volunteer?.date}</span>
              </div>
            </div>
            {volunteer?.summary && (
              <p className="w-full text-[11px] mt-3">{volunteer?.summary}</p>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Volunteer</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default VolunteersPreview;
