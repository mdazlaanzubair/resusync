import { getCertificateData } from "@/redux/resume/actions";
import { Divider, Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CertificatesPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { certificates } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getCertificateData(resume_id));
  }, []);

  if (certificates?.length > 0) {
    return (
      <div className="w-full mt-4 mb-2">
        <h1 className="text-xl font-bold">Certifications</h1>
        <Divider className="border border-black my-3" />
        {certificates?.map((certificate) => (
          <div key={certificate?.id} className="w-full mb-2">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="w-full flex-grow">
                <h1 className="font-bold text-sm">{`${certificate?.title}`}</h1>
                <p className="text-xs">
                  <span>{certificate?.issuer}</span>
                  {certificate?.url && (
                    <>
                      <Divider
                        type="vertical"
                        className="border-[0.5px] border-black/30"
                      />
                      <a
                        href={certificate?.url}
                        target="_blank"
                        className="text-primary underline underline-offset-2"
                      >
                        View credentials
                      </a>
                    </>
                  )}
                  {certificate?.location && (
                    <>
                      <Divider
                        type="vertical"
                        className="border-[0.5px] border-black/30"
                      />
                      <span>{certificate?.location}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="w-fit text-xs text-right">
                <p className="text-nowrap">{certificate?.date}</p>
              </div>
            </div>
            {certificate?.summary && (
              <p className="w-full text-sm mt-3">{certificate?.summary}</p>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full mt-4 mb-2">
        <h1 className="text-xl font-bold">Certifications</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default CertificatesPreview;
