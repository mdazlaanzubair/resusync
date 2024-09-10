import React, { useLayoutEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteInterestData,
  getInterestData,
  saveInterestData,
} from "@/redux/resume/actions";
import { HiMinusCircle } from "react-icons/hi2";
import CreatableSelect from "react-select/creatable";

const InterestsForm = () => {
  const { resume_id } = useParams();
  const { resume_builder } = useSelector((state) => state.resume);
  const { interests } = resume_builder ?? [];
  const dispatch = useDispatch();

  const [interestsFormRef] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleFormSubmit = ({ interests }) => {
    setIsLoading(true);
    // ADDING RESUME ID AND CONVERTING KEYWORDS
    // LIST OF OBJECTS IN TO LIST OF KEYWORDS
    const interestData = interests?.map((interest) => ({
      ...interest,
      resume_id,
      keywords:
        interest?.keywords?.length > 0
          ? interest?.keywords?.map(({ value }) => value)
          : [],
    }));

    // Separate fields with and without "id"
    const bodyWithId = interestData?.filter((int) => int?.id);
    const bodyWithoutId = interestData?.filter((int) => !int?.id);

    const callback = () => {
      setIsLoading(false);
    };
    dispatch(saveInterestData(bodyWithId, bodyWithoutId, callback));
  };

  const handleDeleteInterest = (id, removeFormFieldItemCallback) => {
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
      dispatch(deleteInterestData(id, callback));
    }
  };

  useLayoutEffect(() => {
    if (interests?.length > 0) {
      // CONVERTING LIST OF KEYWORDS TO LIST OF OBJECT
      // TO SHOW THE SELECTABLE DROPDOWN VALUES
      const interestData = interests?.map((interest) => ({
        ...interest,
        keywords: interest?.keywords?.map((word) => ({
          label: word,
          value: word,
        })),
      }));
      interestsFormRef.setFieldsValue({ interestData });
    } else {
      interestsFormRef.setFieldsValue({
        interests: [
          {
            title: "",
            keywords: [],
          },
        ],
      });
    }
  }, [resume_builder]);

  useLayoutEffect(() => {
    dispatch(getInterestData(resume_id));
  }, [resume_id, dispatch]);

  return (
    <Form
      form={interestsFormRef}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="w-full"
    >
      <Form.List name="interests">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-5">
            {fields.map(({ key, name }) => (
              <div
                className="relative grid grid-cols-1 gap-3 border shadow p-5 rounded-lg"
                key={key}
              >
                <Form.Item
                  className="mb-2"
                  name={[name, "title"]}
                  label="Interest Title"
                  rules={[
                    {
                      required: true,
                      message: "Interest title is required",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Machine Learning" />
                </Form.Item>

                <Form.Item
                  className="mb-2"
                  name={[name, "keywords"]}
                  label="Keywords"
                >
                  <CreatableSelect
                    isSearchable
                    isSuccess
                    isMulti
                    isClearable
                    placeholder="Add keywords (e.g. Data Science, Python)"
                  />
                </Form.Item>

                {key !== 0 && (
                  <Button
                    className="absolute -top-3 -right-3 bg-white text-2xl font-black"
                    type="link"
                    disabled={fields?.length <= 1 || isLoading}
                    icon={<HiMinusCircle />}
                    onClick={() => {
                      const removeFormItemCallback = () => remove(name);
                      handleDeleteInterest(
                        interests[name]?.id,
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
              Add Interest
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
            interestsFormRef.setFieldsValue({
              interests: [
                {
                  title: "",
                  keywords: [],
                },
              ],
            })
          }
        >
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default InterestsForm;
