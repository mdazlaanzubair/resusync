import { getBioData } from "@/redux/resume/actions";
import { Divider } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProfilesPreview } from "../../../profile-section/components";

const BiosPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { first_name, last_name, headline, email, location, phone, summary } =
    resume_builder?.bio ?? null;

  useLayoutEffect(() => {
    dispatch(getBioData(resume_id));
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex items-start justify-between gap-3 mb-0">
        <div>
          <h1 className="text-xl">
            <strong>{first_name}</strong>
            {last_name && <span>{` ${last_name}`}</span>}
          </h1>
          <p className="text-sm mb-4">{headline}</p>
          <p className="text-xs">
            <a
              href={`mailto:${email}`}
              className="text-primary underline underline-offset-2"
            >
              {email}
            </a>
            <Divider
              type="vertical"
              className="border-[0.5px] border-black/30"
            />
            {phone && <span>{` ${phone}`}</span>}
            {location && (
              <>
                <Divider
                  type="vertical"
                  className="border-[0.5px] border-black/30"
                />
                <span>{` ${location}`}</span>
              </>
            )}
          </p>
        </div>
        <ProfilesPreview />
      </div>
      <Divider className="border border-black mb-3" />
      {summary && <p className="w-full text-sm">{summary}</p>}
    </div>
  );
};

export default BiosPreview;
