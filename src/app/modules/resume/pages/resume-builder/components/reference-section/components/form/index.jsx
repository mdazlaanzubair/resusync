import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteReferenceData,
  getReferenceData,
  saveReferenceData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";

const ReferencesForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { references } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [referencesFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ references }) => {
    setIsLoading(true);
    const referenceData = references?.map((reference) => ({
      ...reference,
      resume_id,
    }));

    // Separate fields with and without "id"
    const bodyWithId = referenceData?.filter((ref) => ref?.id);
    const bodyWithoutId = referenceData?.filter((ref) => !ref?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveReferenceData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeleteReference = (id, removeFormFieldItemCallback) => {
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
      dispatch(deleteReferenceData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (references?.length > 0) {
      referencesFormRef.setFieldValue("references", references);
    } else {
      referencesFormRef.setFieldValue("references", [
        {
          name: "",
          designation: "",
          email: "",
          phone: "",
        },
      ]);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getReferenceData(resume_id));
  }, []);

  return (
    <Form
      form={referencesFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full"
    >
      <Form.List name="references">
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
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Name is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. John Doe" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "designation"]}
                  label="Designation"
                  rules={[
                    {
                      required: true,
                      message: "Email is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Senior Developer" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "email"]}
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Email is required",
                    },
                    {
                      type: "email",
                      message: "Enter a valid email address",
                    },
                  ]}
                >
                  <Input placeholder="e.g. john.doe@example.com" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "phone"]}
                  label="Phone"
                >
                  <Input placeholder="e.g. +1234567890" />
                </Form.Item>

                {key !== 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      handleDeleteReference(
                        references[name]?.id,
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
              Add Reference
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
            referencesFormRef.setFieldValue("references", [
              {
                name: "",
                designation: "",
                email: "",
                phone: "",
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

export default ReferencesForm;
