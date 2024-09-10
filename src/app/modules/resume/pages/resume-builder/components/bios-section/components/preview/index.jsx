import { getBioData } from "@/redux/resume/actions";
import { Divider, Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProfilesPreview } from "../../../profile-section/components";

const BiosPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { bio } = resume_builder ?? null;

  useLayoutEffect(() => {
    dispatch(getBioData(resume_id));
  }, []);

  if (bio && Object.keys(bio)?.length > 0) {
    return (
      <div className="w-full">
        <div className="w-full flex items-start justify-between gap-3 mb-0">
          <div>
            <h1 className="text-xl">
              <strong>{bio?.first_name}</strong>
              {bio?.last_name && <span>{` ${bio?.last_name}`}</span>}
            </h1>
            <p className="text-sm mb-4">{bio?.headline}</p>
            <p className="text-xs">
              <a
                href={`mailto:${bio?.email}`}
                className="text-primary underline underline-offset-2"
              >
                {bio?.email}
              </a>
              <Divider
                type="vertical"
                className="border-[0.5px] border-black/30"
              />
              {bio?.phone && <span>{` ${bio?.phone}`}</span>}
              {bio?.location && (
                <>
                  <Divider
                    type="vertical"
                    className="border-[0.5px] border-black/30"
                  />
                  <span>{` ${bio?.location}`}</span>
                </>
              )}
            </p>
          </div>
          <ProfilesPreview />
        </div>
        <Divider className="border border-black mb-3" />
        {bio?.summary && <p className="w-full text-sm">{bio?.summary}</p>}
      </div>
    );
  } else {
    return (
      <div className="w-full mt-4 mb-2">
        <h1 className="text-xl font-bold">Bios</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default BiosPreview;
