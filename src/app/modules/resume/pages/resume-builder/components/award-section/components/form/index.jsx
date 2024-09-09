import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteAwardData,
  getAwardData,
  saveAwardData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";
import dayjs from "dayjs";

const AwardsForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { awards } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [awardsFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ awards }) => {
    setIsLoading(true);
    const awardData = awards?.map((award) => ({
      ...award,
      resume_id,
    }));

    // Separate fields with and without "id"
    const bodyWithId = awardData?.filter((award) => award?.id);
    const bodyWithoutId = awardData?.filter((award) => !award?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveAwardData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeleteAward = (id, removeFormFieldItemCallback) => {
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
      dispatch(deleteAwardData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (awards?.length > 0) {
      awardsFormRef.setFieldValue("awards", awards);
    } else {
      awardsFormRef.setFieldValue("awards", [
        {
          title: "",
          awarder: "",
          date: "",
          summary: "",
          url: "",
        },
      ]);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getAwardData(resume_id));
  }, []);

  return (
    <Form
      form={awardsFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full lg:w-1/3"
    >
      <Form.List name="awards">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-5">
            {fields.map(({ key, name }) => (
              <div
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 border shadow p-5 rounded-lg"
                key={key}
              >
                <Form.Item
                  className="mb-2 col-span-1 lg:col-span-2"
                  name={[name, "title"]}
                  label="Award Title"
                  rules={[
                    {
                      required: true,
                      message: "Award title is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Best Developer" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "awarder"]}
                  label="Awarder"
                  rules={[
                    {
                      required: true,
                      message: "Awarder name is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Company Name" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "date"]}
                  label="Award Date"
                  rules={[
                    {
                      required: true,
                      message: "Award date is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Jan 2024" />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "summary"]}
                  label="Summary"
                  rules={[
                    {
                      required: true,
                      message: "Summary is required",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Provide a brief summary of the award"
                    rows={3}
                  />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "url"]}
                  label="Award Link"
                  rules={[
                    {
                      type: "url",
                      message: "Enter a valid URL",
                    },
                  ]}
                >
                  <Input placeholder="e.g. https://award-link.com" />
                </Form.Item>

                {key !== 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      handleDeleteAward(
                        awards[name]?.id,
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
              Add Award
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
            awardsFormRef.setFieldValue("awards", [
              {
                title: "",
                awarder: "",
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

export default AwardsForm;
