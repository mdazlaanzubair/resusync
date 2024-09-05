import { FileUploadFormModal } from "@/general-components";
import { Button } from "antd";
import React, { useState } from "react";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const WelcomeCard = ({ user }) => {
  const navigate = useNavigate();

  const [isShowModal, setIsShowModal] = useState(false);

  const handleOpenModal = () => setIsShowModal(true);
  const closeModal = () => setIsShowModal(false);

  return (
    <div className="col-span-1 lg:col-span-2 gap-3 bg-[#ffffff] rounded-lg p-5 shadow">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-5">
        Welcome, {user?.firstName}
      </h1>
      <p className="text-sm lg:text-lg max-w-xl mb-5">
        We're thrilled to have you on board. Dive in and explore the powerful
        tools designed to help you create an ATS-ready resume that stands out to
        employers.
      </p>
      <FileUploadFormModal visible={isShowModal} closeHandler={closeModal} />

      <Button
        onClick={handleOpenModal}
        type="primary"
        className="w-fit mx-auto text-sm"
        size="large"
        icon={<MdOutlineDocumentScanner />}
      >
        Scan Now
      </Button>
      <Button type="link" size="large" onClick={() => navigate("/resumes")}>
        Perform analysis
      </Button>
    </div>
  );
};

export default WelcomeCard;
