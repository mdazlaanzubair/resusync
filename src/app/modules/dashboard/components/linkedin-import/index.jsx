import React from "react";
import { ShowLottie } from "@/general-components";
import { linkedinProfile } from "@/assets";
import { Button, Form, Input } from "antd";
import { notify } from "@/utils";
import { PiMagnifyingGlassBold } from "react-icons/pi";

const LinkedInImport = () => {
  const [fileUploadFormRef] = Form.useForm();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      <div className="bg-[#ffffff] rounded-lg p-5 shadow-lg">
        <ShowLottie
          width={"100%"}
          height={250}
          animationData={linkedinProfile}
        />
      </div>
      <div className="col-span-1 lg:col-span-3 flex flex-col justify-center bg-[#ffffff] rounded-lg p-5 shadow-lg">
        <h1 className="text-2xl lg:text-3xl font-semibold">
          Import your LinkedIn profile
        </h1>
        <p className="text-lg font-medium text-black/80 mt-3 mb-5">
          You&apos;ve likely already put a lot of time and effort into building
          your LinkedIn profile.
          <br /> Paste the url of your LinkedIn profile to analyze its score.
        </p>
        <Form
          form={fileUploadFormRef}
          onFinish={() => {
            notify(
              "info",
              "LinkedIn Analysis",
              "We're currently working on this feature with LinkedIn to enable this feature."
            );
          }}
          layout="vertical"
          className="flex flex-col lg:flex-row gap-5"
        >
          <Form.Item name="fileName" className="w-full lg:w-1/2">
            <Input
              size="large"
              placeholder="https://www.linkedin.com/in/your-profile/"
              disabled
            />
          </Form.Item>

          <Button
            htmlType="submit"
            size="large"
            key="submit"
            type="primary"
            icon={<PiMagnifyingGlassBold />}
          >
            Analyze
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LinkedInImport;
