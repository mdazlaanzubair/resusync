import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteVolunteerData,
  getVolunteerData,
  saveVolunteerData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";

const VolunteersForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { volunteers } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [volunteersFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ volunteers }) => {
    setIsLoading(true);
    const volunteerData = volunteers?.map((volunteer) => ({
      ...volunteer,
      resume_id,
    }));

    // Separate fields with and without "id"
    const bodyWithId = volunteerData?.filter((vol) => vol?.id);
    const bodyWithoutId = volunteerData?.filter((vol) => !vol?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveVolunteerData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeleteVolunteer = (id, removeFormFieldItemCallback) => {
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
      dispatch(deleteVolunteerData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (volunteers?.length > 0) {
      volunteersFormRef.setFieldsValue({ volunteers });
    } else {
      volunteersFormRef.setFieldsValue({
        volunteers: [
          {
            organization: "",
            role: "",
            location: "",
            date: "",
            summary: "",
            url: "",
          },
        ],
      });
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getVolunteerData(resume_id));
  }, [resume_id, dispatch]);

  return (
    <Form
      form={volunteersFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full lg:w-1/3"
    >
      <Form.List name="volunteers">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-5">
            {fields.map(({ key, name }) => (
              <div
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 border shadow p-5 rounded-lg"
                key={key}
              >
                <Form.Item
                  className="mb-2"
                  name={[name, "organization"]}
                  label="Organization"
                  rules={[
                    {
                      required: true,
                      message: "Organization is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Nonprofit Org" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "role"]}
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: "Role is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Volunteer Coordinator" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "location"]}
                  label="Location"
                  rules={[
                    {
                      required: true,
                      message: "Location is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. City, Country" />
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
                  <Input placeholder="e.g. https://volunteer-link.com" />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "summary"]}
                  label="Summary"
                >
                  <Input.TextArea placeholder="Volunteer summary..." />
                </Form.Item>

                {key !== 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      handleDeleteVolunteer(
                        volunteers[name]?.id,
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
              Add Volunteer
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
            volunteersFormRef.setFieldsValue({
              volunteers: [
                {
                  organization: "",
                  role: "",
                  location: "",
                  date: "",
                  summary: "",
                  url: "",
                },
              ],
            })
          }
          type=""
        >
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default VolunteersForm;
