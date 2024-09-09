import { getVolunteerData } from "@/redux/resume/actions";
import { Divider } from "antd";
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

  return (
    <div className="w-full mt-4 mb-2">
      <h1 className="text-xl font-bold">Volunteer</h1>
      <Divider className="border border-black my-3" />
      {volunteers?.map((volunteer) => (
        <div key={volunteer?.id} className="w-full mb-2">
          <div className="w-full flex items-center gap-3 justify-between">
            <div className="w-full flex-grow">
              <h1 className="font-bold text-sm">{volunteer?.role}</h1>
              <p className="text-xs">
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
                    <span>{volunteer?.location}</span>
                  </>
                )}
              </p>
            </div>
            <div className="w-fit text-xs">
              <span className="text-nowrap">{volunteer?.date}</span>
            </div>
          </div>
          {volunteer?.summary && (
            <p className="w-full text-sm mt-3">{volunteer?.summary}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default VolunteersPreview;
