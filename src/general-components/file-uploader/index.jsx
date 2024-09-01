import React, { useState, useRef } from "react";
import { Modal, Button, Upload, message } from "antd";
import supabase from "@/supabase";
import { MdOutlineDocumentScanner, MdOutlineUploadFile } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";

const FileUploader = () => {
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const fileInputRef = useRef(null);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setFileList([]);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleFileSubmit = async () => {
    try {
      for (const file of fileList) {
        const { data, error } = await supabase.storage
          .from("resumes")
          .upload(file.name, file);

        if (error) {
          throw new Error(error.message);
        }

        console.log("Upload successful:", data);
        message.success("File uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Error uploading files.");
    } finally {
      handleCloseModal();
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
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
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleFileSubmit}
            disabled={fileList.length === 0}
          >
            Upload
          </Button>,
        ]}
      >
        <Upload.Dragger
          id="file-uploader-custom-id"
          fileList={fileList}
          onChange={handleFileChange}
          beforeUpload={() => false} // Prevent default browser upload
          style={{
            width: "100%",
          }}
          listType="picture"
          iconRender={() => (
            <FaRegFilePdf className="my-1 ml-1 text-4xl text-red-500" />
          )}
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
              <code className="bg-slate-300 p-1 rounded mx-1 font-bold">.pdf</code>
              formate.
            </p>
          </div>
        </Upload.Dragger>
      </Modal>
    </>
  );
};

export default FileUploader;
