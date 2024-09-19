import { notify } from "@/utils";
import React, { useEffect, useReducer, useState } from "react";
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
import { Button, Menu } from "antd";
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
import { FaEye, FaEyeSlash } from "react-icons/fa6";



// List of resume forms of each section
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

// Initial state for visibility options for all resume sections
const initialStatesOfResumeSections = {
  isCertificatesVisible: true,
  isProjectsVisible: true,
  isAwardsVisible: true,
  isPublicationsVisible: true,
  isVolunteersVisible: true,
  isReferencesVisible: true,
  isInterestsVisible: true,
  isLanguagesVisible: true,
};

// Reducer function to handle the toggling of each component
const toggleResumeSectionsReducer = (state, action) => {
  switch (action.type) {
    case "CERTIFICATES_SECTION":
      return { ...state, isCertificatesVisible: !state.isCertificatesVisible };
    case "PROJECTS_SECTION":
      return { ...state, isProjectsVisible: !state.isProjectsVisible };
    case "AWARDS_SECTION":
      return { ...state, isAwardsVisible: !state.isAwardsVisible };
    case "PUBLICATIONS_SECTION":
      return { ...state, isPublicationsVisible: !state.isPublicationsVisible };
    case "VOLUNTEERS_SECTION":
      return { ...state, isVolunteersVisible: !state.isVolunteersVisible };
    case "REFERENCES_SECTION":
      return { ...state, isReferencesVisible: !state.isReferencesVisible };
    case "INTERESTS_SECTION":
      return { ...state, isInterestsVisible: !state.isInterestsVisible };
    case "LANGUAGES_SECTION":
      return { ...state, isLanguagesVisible: !state.isLanguagesVisible };
    default:
      return state;
  }
};

const ResumeBuilderPage = () => {
  const { resume_id } = useParams();
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState(0);
  const [menuMode, setMenuMode] = useState("vertical");

  // useReducer hook to manage the visibility of all components
  const [state, dispatch] = useReducer(
    toggleResumeSectionsReducer,
    initialStatesOfResumeSections
  );

  const menuItems = [
    // REQUIRED RESUME SECTIONS
    {
      key: 0,
      label: (
        <div className="w-full flex items-center gap-2">
          <FaUserEdit className="inline" /> Bio Data
        </div>
      ),
      onClick: () => setActiveForm(0),
    },
    {
      key: 1,
      label: (
        <div className="w-full flex items-center gap-2">
          <IoShareSocialSharp className="inline" /> Social Profiles
        </div>
      ),
      onClick: () => setActiveForm(1),
    },
    {
      key: 2,
      label: (
        <div className="w-full flex items-center gap-2">
          <MdOutlineEqualizer className="inline" /> Experiences
        </div>
      ),
      onClick: () => setActiveForm(2),
    },
    {
      key: 3,
      label: (
        <div className="w-full flex items-center gap-2">
          <FaGraduationCap className="inline" /> Education
        </div>
      ),
      onClick: () => setActiveForm(3),
    },
    {
      key: 4,
      label: (
        <div className="w-full flex items-center gap-2">
          <GiBrain className="inline" /> Skills
        </div>
      ),
      onClick: () => setActiveForm(4),
    },
    // OPTIONAL RESUME SECTIONS
    {
      key: 5,
      label: (
        <div className="w-full flex justify-between items-center">
          <span className="flex items-center gap-2">
            <PiCertificateFill className="inline" /> Certifications
          </span>
          <Button
            className="text-xs text-black/60"
            size="small"
            // danger={state.isCertificatesVisible}
            icon={!state.isCertificatesVisible ? <FaEye /> : <FaEyeSlash />}
            type="link"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              notify(
                !state.isCertificatesVisible ? "info" : "warning",
                `CERTIFICATES_SECTION is ${
                  !state.isCertificatesVisible ? "added to" : "removed from"
                } resume`
              );
              dispatch({ type: "CERTIFICATES_SECTION" });
            }}
          />
        </div>
      ),
      onClick: () => setActiveForm(5),
    },
    {
      key: 6,
      label: (
        <div className="w-full flex justify-between items-center">
          <span className="flex items-center gap-2">
            <BsFillTerminalFill className="inline" /> Projects
          </span>
          <Button
            className="text-xs text-black/60"
            size="small"
            // danger={state.isProjectsVisible}
            icon={!state.isProjectsVisible ? <FaEye /> : <FaEyeSlash />}
            type="link"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              notify(
                !state.isProjectsVisible ? "info" : "warning",
                `PROJECTS_SECTION is ${
                  !state.isProjectsVisible ? "added to" : "removed from"
                } resume`
              );
              dispatch({ type: "PROJECTS_SECTION" });
            }}
          />
        </div>
      ),
      onClick: () => setActiveForm(6),
    },
    {
      key: 7,
      label: (
        <div className="w-full flex justify-between items-center">
          <span className="flex items-center gap-2">
            <FaAward className="inline" /> Awards
          </span>
          <Button
            className="text-xs text-black/60"
            size="small"
            // danger={state.isAwardsVisible}
            icon={!state.isAwardsVisible ? <FaEye /> : <FaEyeSlash />}
            type="link"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              notify(
                !state.isAwardsVisible ? "info" : "warning",
                `AWARDS_SECTION is ${
                  !state.isAwardsVisible ? "added to" : "removed from"
                } resume`
              );
              dispatch({ type: "AWARDS_SECTION" });
            }}
          />
        </div>
      ),
      onClick: () => setActiveForm(7),
    },
    {
      key: 8,
      label: (
        <div className="w-full flex justify-between items-center">
          <span className="flex items-center gap-2">
            <SiPublons className="inline" /> Publications
          </span>
          <Button
            className="text-xs text-black/60"
            size="small"
            // danger={state.isPublicationsVisible}
            icon={!state.isPublicationsVisible ? <FaEye /> : <FaEyeSlash />}
            type="link"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              notify(
                !state.isPublicationsVisible ? "info" : "warning",
                `PUBLICATIONS_SECTION is ${
                  !state.isPublicationsVisible ? "added to" : "removed from"
                } resume`
              );
              dispatch({ type: "PUBLICATIONS_SECTION" });
            }}
          />
        </div>
      ),
      onClick: () => setActiveForm(8),
    },
    {
      key: 9,
      label: (
        <div className="w-full flex justify-between items-center">
          <span className="flex items-center gap-2">
            <MdVolunteerActivism className="inline" /> Volunteer
          </span>
          <Button
            className="text-xs text-black/60"
            size="small"
            // danger={state.isVolunteersVisible}
            icon={!state.isVolunteersVisible ? <FaEye /> : <FaEyeSlash />}
            type="link"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              notify(
                !state.isVolunteersVisible ? "info" : "warning",
                `VOLUNTEERS_SECTION is ${
                  !state.isVolunteersVisible ? "added to" : "removed from"
                } resume`
              );
              dispatch({ type: "VOLUNTEERS_SECTION" });
            }}
          />
        </div>
      ),
      onClick: () => setActiveForm(9),
    },
    {
      key: 10,
      label: (
        <div className="w-full flex justify-between items-center">
          <span className="flex items-center gap-2">
            <IoMdGitMerge className="inline" /> References
          </span>
          <Button
            className="text-xs text-black/60"
            size="small"
            // danger={state.isVolunteersVisible}
            icon={!state.isReferencesVisible ? <FaEye /> : <FaEyeSlash />}
            type="link"
            onClick={(e) => {
              e.stopPropagation();
              notify(
                !state.isReferencesVisible ? "info" : "warning",
                `REFERENCES_SECTION is ${
                  !state.isReferencesVisible ? "added to" : "removed from"
                } resume`
              );
              dispatch({ type: "REFERENCES_SECTION" });
            }}
          />
        </div>
      ),
      onClick: () => setActiveForm(10),
    },
    {
      key: 11,
      label: (
        <div className="w-full flex justify-between items-center">
          <span className="flex items-center gap-2">
            <IoGameController className="inline" /> Interests
          </span>
          <Button
            className="text-xs text-black/60"
            size="small"
            // danger={state.isInterestsVisible}
            icon={!state.isInterestsVisible ? <FaEye /> : <FaEyeSlash />}
            type="link"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              notify(
                !state.isInterestsVisible ? "info" : "warning",
                `INTERESTS_SECTION is ${
                  !state.isInterestsVisible ? "added to" : "removed from"
                } resume`
              );
              dispatch({ type: "INTERESTS_SECTION" });
            }}
          />
        </div>
      ),
      onClick: () => setActiveForm(11),
    },
    {
      key: 12,
      label: (
        <div className="w-full flex justify-between items-center">
          <span className="flex items-center gap-2">
            <FaLanguage className="inline" /> Language
          </span>
          <Button
            className="text-xs text-black/60"
            size="small"
            // danger={state.isLanguagesVisible}
            icon={!state.isLanguagesVisible ? <FaEye /> : <FaEyeSlash />}
            type="link"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              notify(
                !state.isLanguagesVisible ? "info" : "warning",
                `LANGUAGES_SECTION is ${
                  !state.isLanguagesVisible ? "added to" : "removed from"
                } resume`
              );
              dispatch({ type: "LANGUAGES_SECTION" });
            }}
          />
        </div>
      ),
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
          {state.isCertificatesVisible && <CertificatesPreview />}
          {state.isProjectsVisible && <ProjectsPreview />}
          {state.isAwardsVisible && <AwardsPreview />}
          {state.isPublicationsVisible && <PublicationPreview />}
          {state.isVolunteersVisible && <VolunteersPreview />}
          {state.isReferencesVisible && <ReferencePreview />}
          {state.isInterestsVisible && <InterestPreview />}
          {state.isLanguagesVisible && <LanguagesPreview />}
        </div>
      </div>
    </>
  );
};

export default ResumeBuilderPage;
