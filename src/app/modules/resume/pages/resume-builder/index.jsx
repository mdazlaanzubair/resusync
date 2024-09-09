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
import { BiosPreview } from "./components/bios-section/components";
import { ProfilesPreview } from "./components/profile-section/components";
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

  const [isMobile, setIsMobile] = useState(false);

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
      label: "Skills",
      icon: <GiBrain className="inline mb-1" />,
      children: <SkillsSection />,
    },
    {
      key: "6",
      label: "Certifications",
      icon: <PiCertificateFill className="inline mb-1" />,
      children: <CertificationSection />,
    },
    {
      key: "7",
      label: "Projects",
      icon: <BsFillTerminalFill className="inline mb-1" />,
      children: <ProjectSection />,
    },
    {
      key: "8",
      label: "Awards",
      icon: <FaAward className="inline mb-1" />,
      children: <AwardSection />,
    },
    {
      key: "9",
      label: "Publications",
      icon: <SiPublons className="inline mb-1" />,
      children: <PublicationSection />,
    },
    {
      key: "10",
      label: "Volunteer",
      icon: <MdVolunteerActivism className="inline mb-1" />,
      children: <VolunteersSection />,
    },
    {
      key: "11",
      label: "References",
      icon: <IoMdGitMerge className="inline mb-1" />,
      children: <ReferenceSection />,
    },
    {
      key: "12",
      label: "Interests",
      icon: <IoGameController className="inline mb-1" />,
      children: <InterestSection />,
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <h1 className="font-bold text-lg mb-5">Resume Builder</h1>
      <div className="w-full h-fit flex flex-col lg:flex-row gap-5 overflow-y-hidden">
        <div className="w-full lg:w-1/2">
          <Tabs
            tabPosition={isMobile ? "top" : "left"}
            defaultActiveKey="1"
            items={items}
          />
        </div>
        <div className="w-full lg:w-1/2 border rounded-lg p-5 overflow-x-auto overflow-y-auto">
          <BiosPreview />
          {/* CONSUMED IN BIOS SECTION */}
          {/* <ProfilesPreview /> */}
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
