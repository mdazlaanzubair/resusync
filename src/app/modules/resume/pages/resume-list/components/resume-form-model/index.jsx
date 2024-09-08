import React, {  useLayoutEffect, useState } from "react";
import { spinner } from "@/assets";
import { ShowLottie } from "@/general-components";
import { useUser } from "@clerk/clerk-react";
import { Button, Form, Input, Modal } from "antd";
import { createResume, updateResume } from "@/redux/resume/actions";
import { useDispatch, useSelector } from "react-redux";
import { resumeActions } from "@/redux/resume/slice";

const ResumeFormModal = ({ visible, closeHandler }) => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { resume_selected } = useSelector((state) => state.resume);

  const [resumeCreateFormRef] = Form.useForm();
  const titleWatcher = Form.useWatch("title", resumeCreateFormRef);

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    closeHandler();
    dispatch(resumeActions.selectResume(null));

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
    if (!resume_selected) {
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
            ...resume_selected,
            title,
          },
          callback
        )
      );
    }
  };

  useLayoutEffect(() => {
    resumeCreateFormRef.setFieldValue("title", resume_selected?.title);
  }, [resume_selected]);

  return (
    <Modal
      title={!resume_selected ? "Create Resume Title" : "Update Resume Title"}
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
          {!resume_selected ? "Create" : "Update"}
        </Button>
      </Form>
    </Modal>
  );
};

export default ResumeFormModal;
