import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteLanguageData,
  getLanguageData,
  saveLanguageData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";

const LanguagesForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { languages } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [languagesFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ languages }) => {
    setIsLoading(true);
    const languageData = languages?.map((language) => ({
      ...language,
      resume_id,
    }));

    // Separate fields with and without "id"
    const bodyWithId = languageData?.filter((lang) => lang?.id);
    const bodyWithoutId = languageData?.filter((lang) => !lang?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveLanguageData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeleteLanguage = (id, removeFormFieldItemCallback) => {
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
      dispatch(deleteLanguageData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (languages?.length > 0) {
      languagesFormRef.setFieldValue("languages", languages);
    } else {
      languagesFormRef.setFieldValue("languages", [
        {
          name: "",
          proficiency: "",
        },
      ]);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getLanguageData(resume_id));
  }, []);

  return (
    <Form
      form={languagesFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full lg:w-1/3"
    >
      <Form.List name="languages">
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
                  label="Language"
                  rules={[
                    {
                      required: true,
                      message: "Language name is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. English" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "proficiency"]}
                  label="Proficiency"
                  rules={[
                    {
                      required: true,
                      message: "Proficiency is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select proficiency"
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Beginner">Beginner</Select.Option>
                    <Select.Option value="Intermediate">Intermediate</Select.Option>
                    <Select.Option value="Advanced">Advanced</Select.Option>
                  </Select>
                </Form.Item>

                {key !== 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      handleDeleteLanguage(
                        languages[name]?.id,
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
              Add Language
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
            languagesFormRef.setFieldValue("languages", [
              {
                name: "",
                proficiency: "",
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

export default LanguagesForm;