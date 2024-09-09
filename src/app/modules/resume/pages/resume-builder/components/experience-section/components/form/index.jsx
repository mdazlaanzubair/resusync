import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteExperienceData,
  getExperienceData,
  saveExperienceData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";

const ExperiencesForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { experiences } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [experiencesFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ experiences }) => {
    setIsLoading(true);
    const experienceData = experiences?.map((experience) => ({
      ...experience,
      resume_id,
    }));

    // Separate fields with and without "id"
    const bodyWithId = experienceData?.filter((exp) => exp?.id);
    const bodyWithoutId = experienceData?.filter((exp) => !exp?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveExperienceData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeleteExperience = (id, removeFormFieldItemCallback) => {
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
      dispatch(deleteExperienceData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (experiences?.length > 0) {
      experiencesFormRef.setFieldValue("experiences", experiences);
    } else {
      experiencesFormRef.setFieldValue("experiences", [
        {
          company: "",
          position: "",
          location: "",
          date: "",
          summary: "",
          url: "",
        },
      ]);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getExperienceData(resume_id));
  }, []);

  return (
    <Form
      form={experiencesFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full lg:w-1/2 flex flex-col gap-5"
    >
      <Form.List name="experiences">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-5">
            {fields.map(({ key, name }) => (
              <div
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 border shadow p-5 rounded-lg"
                key={key}
              >
                <Form.Item
                  name={[name, "company"]}
                  label="Company"
                  rules={[
                    {
                      required: true,
                      message: "Company is required field",
                    },
                  ]}
                >
                  <Input size="large" placeholder="e.g. Google" />
                </Form.Item>

                <Form.Item
                  name={[name, "position"]}
                  label="Position"
                  rules={[
                    {
                      required: true,
                      message: "Position is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="e.g. Software Engineer" />
                </Form.Item>

                <Form.Item name={[name, "location"]} label="Location">
                  <Input size="large" placeholder="e.g. San Francisco, CA" />
                </Form.Item>

                <Form.Item
                  name={[name, "date"]}
                  label="Date"
                  rules={[
                    {
                      required: true,
                      message: "Position is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="e.g. Jan 2024 - Dec 2024" />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2"
                  name={[name, "url"]}
                  label="URL"
                  rules={[
                    {
                      type: "url",
                      message: "Enter a valid url.",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="e.g. https://companywebsite.com"
                  />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2"
                  name={[name, "summary"]}
                  label="Summary"
                >
                  <Input.TextArea size="large" placeholder="Job summary..." />
                </Form.Item>

                {key !== 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    size=""
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      handleDeleteExperience(
                        experiences[name]?.id,
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
              size=""
              disabled={fields?.length >= 5 || isLoading}
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Experience
            </Button>
          </div>
        )}
      </Form.List>

      <div className="flex items-center gap-2">
        <Button
          disabled={isLoading}
          onClick={() =>
            experiencesFormRef.setFieldValue("experiences", [
              {
                company: "",
                position: "",
                location: "",
                date: "",
                summary: "",
                url: "",
              },
            ])
          }
          type=""
        >
          Reset
        </Button>
        <Button
          loading={isLoading}
          disabled={isLoading}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default ExperiencesForm;
