import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteEducationData,
  getEducationData,
  saveEducationData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";

const EducationForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { educations } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [educationFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ educations }) => {
    setIsLoading(true);
    const educationData = educations?.map((item) => ({
      ...item,
      resume_id,
    }));

    // Separate fields with and without "id"
    const bodyWithId = educationData?.filter((item) => item?.id);
    const bodyWithoutId = educationData?.filter((item) => !item?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveEducationData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeleteEducation = (id, removeFormFieldItemCallback) => {
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
      dispatch(deleteEducationData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (educations?.length > 0) {
      educationFormRef.setFieldValue("educations", educations);
    } else {
      educationFormRef.setFieldValue("educations", [
        {
          institute: "",
          study_type: "",
          field: "",
          score: "",
          date: "",
          summary: "",
          url: "",
        },
      ]);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getEducationData(resume_id));
  }, []);

  return (
    <Form
      form={educationFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full lg:w-1/3"
    >
      <Form.List name="educations">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-5">
            {fields.map(({ key, name }) => (
              <div
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 border shadow p-5 rounded-lg"
                key={key}
              >
                <Form.Item
                  className="mb-2 col-span-1 lg:col-span-2"
                  name={[name, "institute"]}
                  label="Institute"
                  rules={[
                    {
                      required: true,
                      message: "Institute is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. MIT" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "study_type"]}
                  label="Study Type"
                  rules={[
                    {
                      required: true,
                      message: "Study Type is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Bachelor's" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "field"]}
                  label="Field of Study"
                  rules={[
                    {
                      required: true,
                      message: "Field of study is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Computer Science" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "score"]}
                  label="Score"
                >
                  <Input placeholder="e.g. 3.8/4.0" />
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
                  <Input placeholder="e.g. Jan 2020 - Dec 2024" />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "url"]}
                  label="Institute Website"
                  rules={[
                    {
                      type: "url",
                      message: "Enter a valid URL.",
                    },
                  ]}
                >
                  <Input placeholder="e.g. https://schoolwebsite.com" />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "summary"]}
                  label="Summary"
                >
                  <Input.TextArea placeholder="Education summary..." />
                </Form.Item>

                {key !== 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      handleDeleteEducation(
                        educations[name]?.id,
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
              Add Education
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
            educationFormRef.setFieldValue("educations", [
              {
                institute: "",
                study_type: "",
                field: "",
                score: "",
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
      </div>
    </Form>
  );
};

export default EducationForm;
