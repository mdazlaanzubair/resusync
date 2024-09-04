import React, { useState } from "react";
import { Modal, Button, Upload, Form, Input } from "antd";
import { MdOutlineDocumentScanner, MdOutlineUploadFile } from "react-icons/md";
import supabase from "@/supabase";
import { useUser } from "@clerk/clerk-react";
import { notify } from "@/utils";
import { ShowLottie } from "..";
import { fileUpload } from "@/assets";

const BUCKET_KEY = import.meta.env.VITE_SUPABASE_BUCKET_KEY;
const { Dragger } = Upload;

const FileUploader = () => {
  const [fileUploadForm] = Form.useForm();
  const fileNameWatcher = Form.useWatch("fileName", fileUploadForm);

  const [visible, setVisible] = useState(false);
  const [previewFileList, setPreviewFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  const handleOpenModal = () => setVisible(true);

  const handleCloseModal = () => {
    setVisible(false);
    setPreviewFileList([]);
    fileUploadForm.resetFields();
  };

  const handleFileSubmit = async ({ fileName, uploader }) => {
    setIsLoading(true);
    const fileSlug = fileName?.replace(/ /g, "-")?.toLowerCase();
    try {
      const { data, error } = await supabase.storage
        .from(`${BUCKET_KEY}`)
        .upload(
          `${user?.username}/${fileSlug}.pdf`,
          uploader?.fileList[0]?.originFileObj,
          {
            cacheControl: "3600",
            upsert: false,
            contentType: "application/pdf",
          }
        );
      if (error) {
        throw error;
      }
      notify(
        "success",
        "Upload Successfully",
        "You file is uploaded to the cloud successfully"
      );

      const reqBody = {
        title: fileName,
        slug: fileSlug,
        file_path: data?.path,
        user_id: user?.id,
      };

      console.log("api_req_body", reqBody);
      handleCloseModal();
    } catch ({ error, message }) {
      notify("error", `Oops! ${error} Error`, `${message}`);
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateFileType = (rule, values) => {
    const { fileList } = values ?? [];
    const fieldError = fileUploadForm.getFieldError("uploader");

    if (
      !fieldError &&
      fileList &&
      fileList?.length > 0 &&
      fileList[fileList?.length - 1]?.type !== "application/pdf"
    ) {
      return Promise.reject("You can only upload parsable PDF files");
    }
    return Promise.resolve();
  };

  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      // Keep only the last file
      setPreviewFileList([fileList[fileList.length - 1]]);
    } else {
      // If the file list is empty, clear the preview and form fields
      setPreviewFileList([]);
      fileUploadForm.resetFields(["fileName", "slug", "uploader"]);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        type="primary"
        className="w-fit mx-auto mt-5 mb-3 text-sm"
        size="large"
        shape="round"
        icon={<MdOutlineDocumentScanner />}
      >
        Scan Now
      </Button>

      <Modal
        title="Resume Upload"
        open={visible}
        onCancel={!isLoading && handleCloseModal}
        footer={null}
        className="relative"
      >
        {isLoading && (
          <div className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-secondary/70 rounded-md flex items-center justify-center">
            <ShowLottie animationData={fileUpload} />
          </div>
        )}
        <Form
          form={fileUploadForm}
          onFinish={handleFileSubmit}
          layout="vertical"
        >
          <Form.Item
            name="fileName"
            label="File Name"
            className="mb-1"
            rules={[
              { required: true, message: "Filename is a required field" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter file title"
              disabled={isLoading}
            />
          </Form.Item>
          {fileNameWatcher?.length > 0 && (
            <p className="text-right text-gray-400">
              <sup>
                {user?.username}/
                <span className="text-primary">
                  {fileNameWatcher?.replace(/ /g, "-")?.toLowerCase()}
                </span>
                .pdf
              </sup>
            </p>
          )}

          <Form.Item
            name={"uploader"}
            // label="Upload your resume"
            rules={[
              { required: true, message: "File is a required field" },
              { validator: validateFileType },
            ]}
          >
            <Dragger
              // THIS ID IS BEING USED FOR CUSTOM STYLING IN index.css
              id="file-uploader-custom-id"
              type="application/pdf"
              accept="application/pdf"
              fileList={previewFileList}
              style={{
                width: "100%",
                marginTop: "1.25rem",
              }}
              listType="picture"
              beforeUpload={() => false} // Prevent default browser upload
              onChange={handleFileChange}
              disabled={isLoading}
            >
              <div className="flex flex-col items-center justify-center">
                <p className="mx-auto">
                  <MdOutlineUploadFile className="text-6xl font-normal" />
                </p>
                <p className="font-bold">
                  Click or drag file to this area to upload
                </p>
                <p className="text-primary text-xs">
                  Strictly prohibited uploading file other than
                  <code className="bg-slate-200 text-red-500 p-1 rounded mx-1 font-bold">
                    .pdf
                  </code>
                  format.
                </p>
              </div>
            </Dragger>
          </Form.Item>

          <div className="flex items-center justify-end">
            <Button
              type="text"
              size="large"
              key="cancel"
              onClick={handleCloseModal}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              size="large"
              key="submit"
              type="primary"
              loading={isLoading}
              disabled={isLoading}
            >
              Upload
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default FileUploader;
