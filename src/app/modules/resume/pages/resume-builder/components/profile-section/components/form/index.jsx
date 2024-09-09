import React, { useEffect, useLayoutEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteProfileData,
  getProfileData,
  saveProfileData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";

const ProfilesForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { profiles } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [profilesFormRef] = Form.useForm();
  const socialNetworksWatcher = Form.useWatch(
    "socialNetworks",
    profilesFormRef
  );

  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ socialNetworks }) => {
    setIsLoading(true);
    const profiles = socialNetworks?.map((profile) => ({
      ...profile,
      resume_id,
    }));

    // EXPLICITLY SEPARATING FIELDS HAVING "id" KEY OR NOT
    const bodyWithId = profiles?.filter((profile) => profile?.id);
    const bodyWithoutId = profiles?.filter((profile) => !profile?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveProfileData(bodyWithId, bodyWithoutId, callback));
  };

  const handelDeleteProfile = (id, removeFormFieldItemCallback) => {
    // IF ONLY REMOVE THE FORM FIELD ITEM
    // ELSE THERE IS "id" WE'LL REMOVE THE FIELD FROM THE DB FIRST
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
      dispatch(deleteProfileData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (profiles?.length > 0) {
      profilesFormRef.setFieldValue("socialNetworks", profiles);
    } else {
      profilesFormRef.setFieldValue("socialNetworks", [
        {
          resume_id: "",
          network: "",
          username: "",
          icon: "",
          url: "",
        },
      ]);
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getProfileData(resume_id));
  }, []);

  return (
    <Form
      form={profilesFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full lg:w-1/2 flex flex-col gap-5"
    >
      <Form.List name="socialNetworks">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-5">
            {fields.map(({ key, name }) => (
              <div
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 border shadow p-5 rounded-lg"
                key={key}
              >
                <Form.Item
                  name={[name, "username"]}
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Username is required field",
                    },
                  ]}
                >
                  <Input size="large" placeholder="e.g. @example" />
                </Form.Item>

                <Form.Item
                  name={[name, "url"]}
                  label="URL"
                  rules={[
                    {
                      required: true,
                      message: "Profile URL is required",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="e.g. https://twitter.com/example"
                  />
                </Form.Item>

                <Form.Item name={[name, "network"]} label="Network">
                  <Input size="large" placeholder="e.g. Twitter" />
                </Form.Item>

                <Form.Item
                  name={[name, "icon"]}
                  label="Icon"
                  help={
                    <p className="text-xs">
                      Powered by{" "}
                      <a
                        href="https://simpleicons.org/"
                        className="underline underline-offset-2 font-semibold"
                        target="_blank"
                      >
                        Simple Icons
                      </a>
                    </p>
                  }
                >
                  <Input
                    prefix={
                      <img
                        src={`https://cdn.simpleicons.org/${
                          socialNetworksWatcher[name]?.icon?.length > 0
                            ? socialNetworksWatcher[name]?.icon
                            : "opencollective"
                        }?viewbox=auto`}
                        className="w-4 h-4 mr-1"
                      />
                    }
                    size="large"
                    placeholder="e.g. twitter"
                  />
                </Form.Item>

                {key != 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    size=""
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      // PASSING ITEM ID AND CALLBACK TO REMOVE FORM ITEM
                      handelDeleteProfile(
                        profiles[name]?.id,
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
              size=""
              disabled={fields?.length >= 5 || isLoading}
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Social Network
            </Button>
          </div>
        )}
      </Form.List>

      <div className="flex items-center gap-2">
        <Button
          disabled={isLoading}
          onClick={() =>
            profilesFormRef.setFieldValue("socialNetworks", [
              {
                resume_id: "",
                network: "",
                username: "",
                icon: "",
                url: "",
              },
            ])
          }
          type=""
        >
          Reset
        </Button>
        <Button
          loading={isLoading}
          disabled={isLoading}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default ProfilesForm;
