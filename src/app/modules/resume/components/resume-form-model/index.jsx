import React, { useEffect, useState } from "react";
import { spinner } from "@/assets";
import { ShowLottie } from "@/general-components";
import { useUser } from "@clerk/clerk-react";
import { Button, Form, Input, Modal } from "antd";
import { createResume, updateResume } from "@/redux/resume/actions";
import { useDispatch } from "react-redux";

const ResumeFormModal = ({
  visible,
  closeHandler,
  editResumeData,
  deselectEditResumeData,
}) => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const [resumeCreateFormRef] = Form.useForm();
  const titleWatcher = Form.useWatch("title", resumeCreateFormRef);

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    closeHandler();
    deselectEditResumeData();
    resumeCreateFormRef.resetFields();
  };

  const handleResumeSubmit = async ({ title }) => {
    setIsLoading(true);

    // DISPATCHING ACTION WITH REQUEST BODY TO FETCH RESUMES WITH A CALLBACK FUNCTION
    const callback = (isSuccess) => {
      if (isSuccess) {
        setIsLoading(false);
        closeHandler();
        resumeCreateFormRef.resetFields();
        return;
      } else {
        setIsLoading(false);
        return;
      }
    };
    if (editResumeData) {
      const reqBody = {
        title,
        slug: title?.replace(/ /g, "-")?.toLowerCase(),
        user_id: user?.id,
      };
      dispatch(createResume(reqBody, callback));
    } else {
      dispatch(
        updateResume(
          {
            ...editResumeData,
            title,
          },
          callback
        )
      );
    }
  };

  useEffect(() => {
    if (editResumeData) {
      resumeCreateFormRef?.setFieldValue("title", editResumeData?.title);
    }
  }, [editResumeData]);

  return (
    <Modal
      title={!editResumeData ? "Create Resume Title" : "Update Resume Title"}
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
            rules={[
              { required: true, message: "Title is a required field" },
              { min: 5, message: "Title must be at least 5 characters" },
              { max: 30, message: "Title cannot exceed 30 characters" },
            ]}
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
          {!editResumeData ? "Create" : "Update"}
        </Button>
      </Form>
    </Modal>
  );
};

export default ResumeFormModal;
