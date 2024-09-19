import { getProfileData } from "@/redux/resume/actions";
import { Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProfilesPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);

  const { profiles } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getProfileData(resume_id));
  }, []);

  if (profiles?.length > 0) {
    return (
      <div className="flex flex-col gap-1">
        {profiles?.map((profile) => (
          <div
            key={profile?.id}
            className="flex items-center gap-3 text-[11px]"
          >
            <img
              src={`https://cdn.simpleicons.org/${
                profile?.icon?.length > 0 ? profile?.icon : "opencollective"
              }?viewbox=auto`}
              className="w-[0.8rem]"
            />
            {
              <a
                href={profile?.url}
                target="_blank"
                className="text-primary underline underline-offset-2"
              >
                {profile?.username}
              </a>
            }
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <>
        <Empty />
      </>
    );
  }
};

export default ProfilesPreview;
