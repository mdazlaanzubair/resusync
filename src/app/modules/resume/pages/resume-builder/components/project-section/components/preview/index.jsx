import { getProjectData } from "@/redux/resume/actions";
import { Divider, Empty } from "antd";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProjectsPreview = () => {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const { resume_builder } = useSelector((state) => state.resume);
  const { projects } = resume_builder ?? [];

  useLayoutEffect(() => {
    dispatch(getProjectData(resume_id));
  }, []);

  if (projects?.length > 0) {
    return (
      <div className="w-full mt-4 mb-2">
        <h1 className="text-xl font-bold">Projects</h1>
        <Divider className="border border-black my-3" />
        {projects?.map((project) => (
          <div key={project?.id} className="w-full mb-2">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="w-full flex-grow">
                <h1 className="font-bold text-sm">{`${project?.name}`}</h1>
                <p className="text-xs">
                  {project?.url && (
                    <a
                      href={project?.url}
                      target="_blank"
                      className="text-primary underline underline-offset-2"
                    >
                      View project
                    </a>
                  )}
                  {project?.location && (
                    <>
                      <Divider
                        type="vertical"
                        className="border-[0.5px] border-black/30"
                      />
                      <span>{project?.location}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="w-fit text-xs text-right">
                <p className="text-nowrap">{project?.date}</p>
              </div>
            </div>
            {project?.summary && (
              <p className="w-full text-sm mt-3">{project?.summary}</p>
            )}
            <div className="flex flex-wrap gap-1 items-center text-xs">
              {project?.keywords &&
                project?.keywords?.map((keyword) => (
                  <p
                    className="px-2 py-1 rounded-md bg-primary/10 text-primary"
                    key={keyword}
                  >
                    {keyword}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full mt-4 mb-2">
        <h1 className="text-xl font-bold">Projects</h1>
        <Divider className="border border-black my-3" />
        <Empty />
      </div>
    );
  }
};

export default ProjectsPreview;
