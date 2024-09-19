import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BsStars } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getBioData, saveBioData } from "@/redux/resume/actions";

const BiosForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { bio } = resume_builder ?? null;
  const dispatch = useDispatch();

  const [biosFormRef] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = (values) => {
    setIsLoading(true);
    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveBioData({ resume_id, ...values }, callback));
  };

  useLayoutEffect(() => {
    if (bio) {
      biosFormRef.setFieldsValue(bio);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getBioData(resume_id));
  }, []);

  return (
    <Form
      form={biosFormRef}
      onFinish={handleFormSubmit}
      layout="vertical"
      initialValues={bio}
      className="w-full border p-5 rounded-lg shadow"
    >
      <div className="flex flex-col lg:flex-row gap-5">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "First name is required" }]}
          className="mb-2 w-full"
        >
          <Input placeholder="e.g. John Doe" />
        </Form.Item>
        <Form.Item label="Last Name" name="last_name" className="mb-2 w-full">
          <Input placeholder="e.g. John Doe" />
        </Form.Item>
      </div>

      <Form.Item
        label="Headline"
        name="headline"
        rules={[{ required: true, message: "Headline is required" }]}
        className="mb-2"
      >
        <Input placeholder="e.g. Web Developer" />
      </Form.Item>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <Form.Item
          className="w-full mb-2"
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="e.g. abc@example.com" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Phone number is required" }]}
          className="w-full mb-2"
        >
          <Input placeholder="e.g. +920000000000" />
        </Form.Item>
      </div>

      <Form.Item label="Location" name="location" className="mb-2">
        <Input placeholder="e.g. Karachi, Pakistan" />
      </Form.Item>

      <div className="w-full flex items-end justify-between gap-5 mb-3">
        <label htmlFor="summary">Summary</label>
        <Button size="small" icon={<BsStars />} />
      </div>
      <Form.Item name="summary" className="mb-2">
        <Input.TextArea placeholder="A brief summary about you" rows={4} />
      </Form.Item>

      <div className="flex items-center justify-end gap-3">
        <Button
          loading={isLoading}
          disabled={isLoading}
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>
        <Button
          loading={isLoading}
          disabled={isLoading}
          type=""
          onClick={() => biosFormRef.resetFields()}
        >
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default BiosForm;
