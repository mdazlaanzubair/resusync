import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button, Select, Slider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteSkillData,
  getSkillData,
  saveSkillData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";

const SkillsForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { skills } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [skillsFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ skills }) => {
    setIsLoading(true);
    const skillData = skills?.map((skill) => ({
      ...skill,
      resume_id,
    }));

    // Separate fields with and without "id"
    const bodyWithId = skillData?.filter((skill) => skill?.id);
    const bodyWithoutId = skillData?.filter((skill) => !skill?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveSkillData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeleteSkill = (id, removeFormFieldItemCallback) => {
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
      dispatch(deleteSkillData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (skills?.length > 0) {
      skillsFormRef.setFieldValue("skills", skills);
    } else {
      skillsFormRef.setFieldValue("skills", [
        {
          title: "",
          level: 0,
          keywords: [],
        },
      ]);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getSkillData(resume_id));
  }, []);

  return (
    <Form
      form={skillsFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full lg:w-1/3"
    >
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-5">
            {fields.map(({ key, name }) => (
              <div
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 border shadow p-5 rounded-lg"
                key={key}
              >
                <Form.Item
                  className="mb-2"
                  name={[name, "title"]}
                  label="Skill Title"
                  rules={[
                    {
                      required: true,
                      message: "Skill title is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. JavaScript" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "level"]}
                  label="Skill Level"
                  initialValue={0}
                >
                  <Slider
                    dots
                    tooltip={{ placement: "bottom", color: "blue" }}
                    min={0}
                    max={5}
                  />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "keywords"]}
                  label="Keywords"
                  help={
                    <small>Keywords should be related to the skill title</small>
                  }
                >
                  <Select
                    mode="tags"
                    placeholder="Add keywords (e.g. Programming, Scripting)"
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
                      handleDeleteSkill(
                        skills[name]?.id,
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
              Add Skill
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
            skillsFormRef.setFieldValue("skills", [
              {
                title: "",
                level: 0,
                keywords: [],
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

export default SkillsForm;
