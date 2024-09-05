import React, { useState } from "react";
import { Modal, Button, Upload, Form, Input } from "antd";
import { MdOutlineUploadFile } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import { notify } from "@/utils";
import { ShowLottie } from "..";
import { fileUpload } from "@/assets";
import { deleteFile, uploadFile } from "@/supabase/storage";
import { createResume } from "@/supabase/resumes";

const { Dragger } = Upload;

const FileUploadFormModal = ({ visible, closeHandler }) => {
  const [fileUploadFormRef] = Form.useForm();
  const fileNameWatcher = Form.useWatch("fileName", fileUploadFormRef);

  const [isLoading, setIsLoading] = useState(false);
  const [previewFileList, setPreviewFileList] = useState([]);

  const { user } = useUser();

  const handleCloseModal = () => {
    closeHandler();
    setPreviewFileList([]);
    fileUploadFormRef.resetFields();
  };

  const handleFileSubmit = async ({ fileName, uploader }) => {
    setIsLoading(true);

    const resumeData = {
      title: fileName,
      slug: fileName?.replace(/ /g, "-")?.toLowerCase(),
      user_id: user?.id,
    };

    try {
      // SAVING FILE TO SUPABASE STORAGE
      const { data: storageData, error: storageError } = await uploadFile(
        `${user?.username}/${resumeData?.slug}.pdf`,
        uploader?.fileList[0]?.originFileObj
      );

      // THROW ERROR IF ANY
      if (storageError) throw storageError;

      // ELSE SAVE UPLOADED RESUME DATA TO SUPABASE
      // APPENDING FILE PATH IN RESUME DATA OBJECT THAT RECEIVED AFTER FILE UPLOAD
      resumeData["file_path"] = storageData?.path;

      // SAVING RESUME DATA TO THE TABLE
      const { data, error: resumeError } = await createResume(resumeData);

      // THROW ERROR IF ANY
      if (resumeError) {
        // IF ERROR OCCURRED DURING SAVING OF RESUME DATA
        // THE FILE RECENTLY UPLOADED WILL BE DELETED
        await deleteFile(resumeData?.file_path);

        throw resumeError;
      }

      // ELSE SHOW SUCCESS MESSAGE
      notify(
        "success",
        "Upload Successfully",
        "You file is uploaded to the cloud successfully"
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

  const validateFileType = (rule, values) => {
    const { fileList } = values ?? [];
    const fieldError = fileUploadFormRef.getFieldError("uploader");

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
      fileUploadFormRef.resetFields(["fileName", "slug", "uploader"]);
    }
  };

  return (
    <Modal
      title="Resume Upload"
      open={visible}
      onCancel={!isLoading && handleCloseModal}
      footer={null}
      className="relative"
    >
      {isLoading && (
        <div className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-primary/80 rounded-md flex items-center justify-center">
          <ShowLottie animationData={fileUpload} />
        </div>
      )}
      <Form
        form={fileUploadFormRef}
        onFinish={handleFileSubmit}
        layout="vertical"
      >
        <Form.Item
          name="fileName"
          label="File Name"
          className="mb-1"
          rules={[{ required: true, message: "Filename is a required field" }]}
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
  );
};

export default FileUploadFormModal;
