import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteCertificateData,
  getCertificateData,
  saveCertificateData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";

const CertificatesForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { certificates } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [certificatesFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ certificates }) => {
    setIsLoading(true);
    const certificateData = certificates?.map((certificate) => ({
      ...certificate,
      resume_id,
    }));

    // Separate fields with and without "id"
    const bodyWithId = certificateData?.filter((cert) => cert?.id);
    const bodyWithoutId = certificateData?.filter((cert) => !cert?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveCertificateData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeleteCertificate = (id, removeFormFieldItemCallback) => {
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
      dispatch(deleteCertificateData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (certificates?.length > 0) {
      certificatesFormRef.setFieldValue("certificates", certificates);
    } else {
      certificatesFormRef.setFieldValue("certificates", [
        {
          title: "",
          issuer: "",
          date: "",
          summary: "",
          url: "",
        },
      ]);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getCertificateData(resume_id));
  }, []);

  return (
    <Form
      form={certificatesFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full"
    >
      <Form.List name="certificates">
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
                  label="Certificate Title"
                  rules={[
                    {
                      required: true,
                      message: "Title is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Frontend Development" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "issuer"]}
                  label="Issuer"
                  rules={[
                    {
                      required: true,
                      message: "Issuer is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Coursera" />
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
                  <Input placeholder="e.g. Jan 2024" />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "url"]}
                  label="Certificate Link"
                  rules={[
                    {
                      type: "url",
                      message: "Enter a valid URL",
                    },
                  ]}
                >
                  <Input placeholder="e.g. https://certificate-link.com" />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "summary"]}
                  label="Summary"
                >
                  <Input.TextArea placeholder="Certificate summary..." />
                </Form.Item>

                {key !== 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      handleDeleteCertificate(
                        certificates[name]?.id,
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
              Add Certificate
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
            certificatesFormRef.setFieldValue("certificates", [
              {
                title: "",
                issuer: "",
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

export default CertificatesForm;
