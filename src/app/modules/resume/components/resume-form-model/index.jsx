import React, { useState } from "react";
import { spinner } from "@/assets";
import { ShowLottie } from "@/general-components";
import { createResume } from "@/supabase/resumes";
import { useUser } from "@clerk/clerk-react";
import { Button, Form, Input, Modal } from "antd";
import { notify } from "@/utils";

const ResumeFormModal = ({ visible, closeHandler, editResumeData }) => {
  const { user } = useUser();

  const [resumeCreateFormRef] = Form.useForm();
  const titleWatcher = Form.useWatch("title", resumeCreateFormRef);

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    closeHandler();
    fileUploadFormRef.resetFields();
  };

  const handleResumeSubmit = async ({ title }) => {
    setIsLoading(true);

    try {
      // SAVING RESUME DATA TO THE TABLE
      const { data, error: error } = await createResume({
        title,
        slug: title?.replace(/ /g, "-")?.toLowerCase(),
        user_id: user?.id,
      });

      // THROW ERROR IF ANY
      if (error) throw error;

      // ELSE SHOW SUCCESS MESSAGE
      notify(
        "success",
        "Created Successfully",
        "Your resume created successfully"
      );

      console.log("data", data);
      handleCloseModal();
    } catch ({ error, message }) {
      notify("error", `Oops! ${error} Error`, `${message}`);
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Resume Title"
      open={visible}
      onCancel={!isLoading && handleCloseModal}
      footer={null}
      className="relative"
    >
      {isLoading && (
        <div className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-primary/80 rounded-md flex items-center justify-center">
          <ShowLottie animationData={spinner} />
        </div>
      )}
      <Form
        form={resumeCreateFormRef}
        onFinish={handleResumeSubmit}
        layout="vertical"
        className="flex justify-between gap-5 pt-5"
      >
        <div className="flex-grow">
          <Form.Item
            name="title"
            className="mb-1"
            rules={[{ required: true, message: "Title is a required field" }]}
          >
            <Input
              size="large"
              placeholder="Enter file title"
              disabled={isLoading}
            />
          </Form.Item>
          {titleWatcher?.length > 0 && (
            <p className=" text-gray-400">
              <sup>{titleWatcher?.replace(/ /g, "-")?.toLowerCase()}</sup>
            </p>
          )}
        </div>

        <Button
          htmlType="submit"
          size="large"
          key="submit"
          type="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          Create
        </Button>
      </Form>
    </Modal>
  );
};

export default ResumeFormModal;
