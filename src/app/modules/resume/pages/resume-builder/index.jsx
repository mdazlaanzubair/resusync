import { notify } from "@/utils";
import React, { useEffect, useState } from "react";
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
import { Divider, Menu } from "antd";
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
import { BiosPreview } from "./components/bios-section/components";
import { ExperiencePreview } from "./components/experience-section/components";
import { CertificatesPreview } from "./components/certification-section/components";
import { ProjectsPreview } from "./components/project-section/components";
import { AwardsPreview } from "./components/award-section/components";
import { PublicationPreview } from "./components/publication-section/components";
import { ReferencePreview } from "./components/reference-section/components";
import { VolunteersPreview } from "./components/volunteers-section/components";
import { InterestPreview } from "./components/interest-section/components";
import { LanguagesPreview } from "./components/language-section/components";
import { EducationPreview } from "./components/education-section/components";
import { SkillsPreview } from "./components/skills-section/components";

const ResumeBuilderPage = () => {
  const { resume_id } = useParams();
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState(0);
  const [menuMode, setMenuMode] = useState("vertical");

  const formsComponents = [
    <BiosSection />,
    <ProfileSection />,
    <ExperienceSection />,
    <EducationSection />,
    <SkillsSection />,
    <CertificationSection />,
    <ProjectSection />,
    <AwardSection />,
    <PublicationSection />,
    <VolunteersSection />,
    <ReferenceSection />,
    <InterestSection />,
    <LanguageSection />,
  ];

  const menuItems = [
    {
      key: 0,
      label: "Bio Data",
      icon: <FaUserEdit className="inline" />,
      onClick: () => setActiveForm(0),
    },
    {
      key: 1,
      label: "Social Profiles",
      icon: <IoShareSocialSharp className="inline" />,
      onClick: () => setActiveForm(1),
    },
    {
      key: 2,
      label: "Experiences",
      icon: <MdOutlineEqualizer className="inline" />,
      onClick: () => setActiveForm(2),
    },
    {
      key: 3,
      label: "Education",
      icon: <FaGraduationCap className="inline" />,
      onClick: () => setActiveForm(3),
    },
    {
      key: 4,
      label: "Skills",
      icon: <GiBrain className="inline" />,
      onClick: () => setActiveForm(4),
    },
    {
      key: 5,
      label: "Certifications",
      icon: <PiCertificateFill className="inline" />,
      onClick: () => setActiveForm(5),
    },
    {
      key: 6,
      label: "Projects",
      icon: <BsFillTerminalFill className="inline" />,
      onClick: () => setActiveForm(6),
    },
    {
      key: 7,
      label: "Awards",
      icon: <FaAward className="inline" />,
      onClick: () => setActiveForm(7),
    },
    {
      key: 8,
      label: "Publications",
      icon: <SiPublons className="inline" />,
      onClick: () => setActiveForm(8),
    },
    {
      key: 9,
      label: "Volunteer",
      icon: <MdVolunteerActivism className="inline" />,
      onClick: () => setActiveForm(9),
    },
    {
      key: 10,
      label: "References",
      icon: <IoMdGitMerge className="inline" />,
      onClick: () => setActiveForm(10),
    },
    {
      key: 11,
      label: "Interests",
      icon: <IoGameController className="inline" />,
      onClick: () => setActiveForm(11),
    },
    {
      key: 12,
      label: "Language",
      icon: <FaLanguage className="inline" />,
      onClick: () => setActiveForm(12),
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

  // useEffect to handle window resize event
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setMenuMode("horizontal"); // Switch to horizontal for smaller screens
      } else {
        setMenuMode("vertical"); // Switch to vertical for larger screens
      }
    };

    // Check initial screen size on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <h1 className="font-bold text-lg mb-5">Resume Builder</h1>
      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-hidden">
        <Menu
          className="bg-white col-span-1 lg:col-span-2 mb-5"
          mode={menuMode}
          selectedKeys={[`${activeForm}`]}
          items={menuItems}
        />
        <div className="col-span-1 lg:col-span-4">
          {formsComponents[activeForm]}
        </div>
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-3 border rounded-lg p-5 overflow-x-auto overflow-y-auto shadow-lg m-0 mb-5">
          <BiosPreview />
          <ExperiencePreview />
          <EducationPreview />
          <SkillsPreview />
          <CertificatesPreview />
          <ProjectsPreview />
          <AwardsPreview />
          <PublicationPreview />
          <VolunteersPreview />
          <ReferencePreview />
          <InterestPreview />
          <LanguagesPreview />
        </div>
      </div>
    </>
  );
};

export default ResumeBuilderPage;
