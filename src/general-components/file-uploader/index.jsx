import React, { useState, useRef } from "react";
import { Modal, Button, Upload, message } from "antd";
import { createClient } from "@supabase/supabase-js";
import supabase from "@/supabase";
import { MdOutlineDocumentScanner } from "react-icons/md";

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
        title="File Upload"
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
        <Upload
          fileList={fileList}
          onChange={handleFileChange}
          beforeUpload={() => false} // Prevent default browser upload
        >
          <Button type="primary">
            <input
              type="file"
              multiple
              accept="*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            Click to Upload
          </Button>
        </Upload>
      </Modal>
    </>
  );
};

export default FileUploader;
