import { getPublicationData } from "@/redux/resume/actions";
import { Divider, Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PublicationPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { publications } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getPublicationData(resume_id));
  }, []);

  if (publications?.length > 0) {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Publications</h1>
        <Divider className="border border-black my-3" />
        {publications?.map((publication) => (
          <div key={publication?.id} className="w-full mb-2">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="w-full flex-grow">
                <h1 className="font-bold text-[12px]">{`${publication?.title}`}</h1>
                <p className="text-[10px]">
                  <span>{publication?.publisher}</span>
                  {publication?.url && (
                    <>
                      <Divider
                        type="vertical"
                        className="border-[0.5px] border-black/30"
                      />
                      <a
                        href={publication?.url}
                        target="_blank"
                        className="text-primary underline underline-offset-2"
                      >
                        View here
                      </a>
                    </>
                  )}
                  {publication?.location && (
                    <>
                      <Divider
                        type="vertical"
                        className="border-[0.5px] border-black/30"
                      />
                      <span className="text-[10px]">{publication?.location}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="w-fit text-[11px] text-right">
                <p className="text-nowrap">{publication?.date}</p>
              </div>
            </div>
            {publication?.summary && (
              <p className="w-full text-[11px] mt-2">{publication?.summary}</p>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <h1 className="text-[14px] font-bold">Publications</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default PublicationPreview;
