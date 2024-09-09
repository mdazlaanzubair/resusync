import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteProjectData,
  getProjectData,
  saveProjectData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";

const ProjectsForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { projects } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [projectsFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ projects }) => {
    setIsLoading(true);
    const projectData = projects?.map((project) => ({
      ...project,
      resume_id,
    }));

    // Separate fields with and without "id"
    const bodyWithId = projectData?.filter((proj) => proj?.id);
    const bodyWithoutId = projectData?.filter((proj) => !proj?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveProjectData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeleteProject = (id, removeFormFieldItemCallback) => {
    if (!id) {
      removeFormFieldItemCallback();
    } else {
      setIsLoading(true);
      const callback = (isSuccess) => {
        if (isSuccess) {
          removeFormFieldItemCallback();
        }
        setIsLoading(false);
      };
      dispatch(deleteProjectData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (projects?.length > 0) {
      projectsFormRef.setFieldValue("projects", projects);
    } else {
      projectsFormRef.setFieldValue("projects", [
        {
          name: "",
          date: "",
          summary: "",
          keywords: [],
          url: "",
        },
      ]);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getProjectData(resume_id));
  }, []);

  return (
    <Form
      form={projectsFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full"
    >
      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-5">
            {fields.map(({ key, name }) => (
              <div
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 border shadow p-5 rounded-lg"
                key={key}
              >
                <Form.Item
                  className="mb-2"
                  name={[name, "name"]}
                  label="Project Name"
                  rules={[
                    {
                      required: true,
                      message: "Project name is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Portfolio Website" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "date"]}
                  label="Date"
                  rules={[
                    {
                      required: true,
                      message: "Date is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. March 2024" />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "url"]}
                  label="URL"
                  rules={[
                    {
                      type: "url",
                      message: "Enter a valid URL",
                    },
                  ]}
                >
                  <Input placeholder="e.g. https://project-link.com" />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "summary"]}
                  label="Summary"
                >
                  <Input.TextArea placeholder="Project summary..." />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "keywords"]}
                  label="Keywords"
                >
                  <Select
                    mode="tags"
                    placeholder="Add keywords (e.g. React, JavaScript)"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {key !== 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      handleDeleteProject(
                        projects[name]?.id,
                        removeFormItemCallback
                      );
                    }}
                    danger
                  />
                )}
              </div>
            ))}

            <Button
              type="dashed"
              disabled={fields?.length >= 5 || isLoading}
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Project
            </Button>
          </div>
        )}
      </Form.List>

      <div className="flex items-center justify-end gap-3 mt-3">
        <Button
          loading={isLoading}
          disabled={isLoading}
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>
        <Button
          disabled={isLoading}
          onClick={() =>
            projectsFormRef.setFieldValue("projects", [
              {
                name: "",
                date: "",
                summary: "",
                keywords: [],
                url: "",
              },
            ])
          }
          type=""
        >
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default ProjectsForm;
