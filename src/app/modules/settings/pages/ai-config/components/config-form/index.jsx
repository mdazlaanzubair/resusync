import { getAIConfig, saveAIConfig } from "@/redux/llm-config/actions";
import { useUser } from "@clerk/clerk-react";
import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const listOfAiModels = [
  {
    id: 1,
    label: "Gemini 1.5 Flash",
    value: "gemini-1.5-flash-001",
  },
  {
    id: 2,
    label: "Gemini 1.5 Pro",
    value: "gemini-1.5-pro-001",
  },
];

const ConfigForm = ({ setModelKey }) => {
  const [configFormRef] = Form.useForm();
  const { user } = useUser();
  const dispatch = useDispatch();
  const { llmConfigs } = useSelector((state) => state?.llmConfig);

  const [isLoading, setIsLoading] = useState(false);

  const submitAIConfigHandler = ({ api_key, model }) => {
    setIsLoading(true);
    const reqBody = {
      api_key,
      model,
      name: listOfAiModels?.filter((item) => item?.value === model)[0]?.label,
      user_id: user?.id,
    };

    // DISPATCHING ACTION WITH A CALLBACK
    const callback = (success) => {
      if (success) {
        configFormRef.setFieldValue("api_key", "");
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
      }
    };

    dispatch(saveAIConfig(reqBody, callback));
  };

  // USE-EFFECT TO PREVENT AUTO-COMPLETING FORM
  useEffect(() => {
    configFormRef.setFieldValue("api_key", "");
    configFormRef.setFieldValue(
      "model",
      llmConfigs?.model ?? "gemini-1.5-flash-001"
    );
    dispatch(getAIConfig(user?.id));
  }, []);
  return (
    <Form
      initialValues={{ api_key: "" }}
      form={configFormRef}
      onFinish={submitAIConfigHandler}
      layout="vertical"
      className="w-full lg:w-2/5"
    >
      <Form.Item
        name="model"
        label="Choose a model"
        rules={[{ required: true, message: "Please select any model" }]}
      >
        <Select
          size="large"
          onChange={(value) => setModelKey(value)}
          options={listOfAiModels}
        />
      </Form.Item>

      <Form.Item
        name="api_key"
        label="Paste your api key"
        rules={[{ required: true, message: "Please enter the API Key" }]}
      >
        <Input.Password size="large" placeholder="Paste Gemini API" />
      </Form.Item>

      <Button
        loading={isLoading}
        disabled={isLoading}
        htmlType="submit"
        key="submit"
        type="primary"
      >
        Save & Configure
      </Button>
    </Form>
  );
};

export default ConfigForm;
