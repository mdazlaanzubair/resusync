import { notify } from "@/utils";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AwardSection,
  BiosSection,
  CertificationSection,
  EducationSection,
  ExperienceSection,
  InterestSection,
  LanguageSection,
  ProfileSection,
  ProjectSection,
  PublicationSection,
  ReferenceSection,
  SkillsSection,
  VolunteersSection,
} from "./components";
import { Tabs } from "antd";
import {
  FaAward,
  FaGraduationCap,
  FaLanguage,
  FaUserEdit,
} from "react-icons/fa";
import { IoGameController, IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineEqualizer, MdVolunteerActivism } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { BsFillTerminalFill } from "react-icons/bs";
import { SiPublons } from "react-icons/si";
import { IoMdGitMerge } from "react-icons/io";
import { GiBrain } from "react-icons/gi";

const ResumeBuilderPage = () => {
  const { resume_id } = useParams();
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: "Bio Data",
      icon: <FaUserEdit className="inline mb-1" />,
      children: <BiosSection />,
    },
    {
      key: "2",
      label: "Social Profiles",
      icon: <IoShareSocialSharp className="inline mb-1" />,
      children: <ProfileSection />,
    },
    {
      key: "3",
      label: "Experiences",
      icon: <MdOutlineEqualizer className="inline mb-1" />,
      children: <ExperienceSection />,
    },
    {
      key: "4",
      label: "Education",
      icon: <FaGraduationCap className="inline mb-1" />,
      children: <EducationSection />,
    },
    {
      key: "5",
      label: "Certifications",
      icon: <PiCertificateFill className="inline mb-1" />,
      children: <CertificationSection />,
    },
    {
      key: "6",
      label: "Projects",
      icon: <BsFillTerminalFill className="inline mb-1" />,
      children: <ProjectSection />,
    },
    {
      key: "7",
      label: "Awards",
      icon: <FaAward className="inline mb-1" />,
      children: <AwardSection />,
    },
    {
      key: "8",
      label: "Publications",
      icon: <SiPublons className="inline mb-1" />,
      children: <PublicationSection />,
    },
    {
      key: "9",
      label: "References",
      icon: <IoMdGitMerge className="inline mb-1" />,
      children: <ReferenceSection />,
    },
    {
      key: "10",
      label: "Volunteer",
      icon: <MdVolunteerActivism className="inline mb-1" />,
      children: <VolunteersSection />,
    },
    {
      key: "11",
      label: "Interests",
      icon: <IoGameController className="inline mb-1" />,
      children: <InterestSection />,
    },
    {
      key: "12",
      label: "Skills",
      icon: <GiBrain className="inline mb-1" />,
      children: <SkillsSection />,
    },
    {
      key: "13",
      label: "Language",
      icon: <FaLanguage className="inline mb-1" />,
      children: <LanguageSection />,
    },
  ];

  useEffect(() => {
    if (!resume_id) {
      notify(
        "info",
        "Resume Not Selected",
        "Please select a resume before navigating to the builder."
      );
      navigate("/resumes");
    }
  }, [resume_id]);

  return (
    <div className="w-full h-fit flex flex-col gap-5 overflow-y-hidden">
      <h1 className="font-bold">Resume Builder</h1>
      <Tabs tabPosition="left" defaultActiveKey="1" items={items} />
    </div>
  );
};

export default ResumeBuilderPage;
