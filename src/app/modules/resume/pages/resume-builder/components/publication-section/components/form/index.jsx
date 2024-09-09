import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deletePublicationData,
  getPublicationData,
  savePublicationData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";

const PublicationsForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { publications } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [publicationsFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ publications }) => {
    setIsLoading(true);
    const publicationData = publications?.map((publication) => ({
      ...publication,
      resume_id,
    }));

    // Separate fields with and without "id"
    const bodyWithId = publicationData?.filter((pub) => pub?.id);
    const bodyWithoutId = publicationData?.filter((pub) => !pub?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(savePublicationData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeletePublication = (id, removeFormFieldItemCallback) => {
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
      dispatch(deletePublicationData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (publications?.length > 0) {
      publicationsFormRef.setFieldValue("publications", publications);
    } else {
      publicationsFormRef.setFieldValue("publications", [
        {
          name: "",
          publisher: "",
          date: "",
          summary: "",
          url: "",
        },
      ]);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getPublicationData(resume_id));
  }, []);

  return (
    <Form
      form={publicationsFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full"
    >
      <Form.List name="publications">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-5">
            {fields.map(({ key, name }) => (
              <div
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 border shadow p-5 rounded-lg"
                key={key}
              >
                <Form.Item
                  className="mb-2 col-span-1 lg:col-span-2"
                  name={[name, "name"]}
                  label="Publication Name"
                  rules={[
                    {
                      required: true,
                      message: "Publication name is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Research Paper on AI" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "publisher"]}
                  label="Publisher"
                  rules={[
                    {
                      required: true,
                      message: "Publisher name is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. IEEE" />
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
                  label="URL"
                  rules={[
                    {
                      type: "url",
                      message: "Enter a valid URL",
                    },
                  ]}
                >
                  <Input placeholder="e.g. https://publication-link.com" />
                </Form.Item>

                <Form.Item
                  className="col-span-1 lg:col-span-2 mb-2"
                  name={[name, "summary"]}
                  label="Summary"
                >
                  <Input.TextArea placeholder="Publication summary..." />
                </Form.Item>

                {key !== 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      handleDeletePublication(
                        publications[name]?.id,
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
              Add Publication
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
            publicationsFormRef.setFieldValue("publications", [
              {
                name: "",
                publisher: "",
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

export default PublicationsForm;
