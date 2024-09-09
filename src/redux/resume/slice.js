import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumes: [],
  resume_selected: null,
  resume_builder: {
    bio: {
      resume_id: "",
      name: "",
      headline: "",
      summary: "",
      email: "",
      phone: "",
      location: "",
    },
    profiles: [
      {
        resume_id: "",
        network: "",
        username: "",
        icon: "",
        url: "",
      },
    ],
    experiences: [
      {
        company: "",
        position: "",
        location: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    educations: [
      {
        institute: "",
        studyType: "",
        field: "",
        score: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    skills: [
      {
        title: "",
        level: 0,
        keywords: [],
      },
    ],
    certificates: [
      {
        title: "",
        issuer: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    projects: [
      {
        name: "",
        date: "",
        summary: "",
        keywords: [],
        url: "",
      },
    ],
    awards: [
      {
        title: "",
        awarder: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    publications: [
      {
        name: "",
        publisher: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    references: [
      {
        name: "",
        designation: "",
        email: "",
        phone: "",
      },
    ],
    volunteers: [
      {
        organization: "",
        role: "",
        location: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    interests: [
      {
        title: "",
        keywords: [],
        url: "",
      },
    ],
    languages: [
      {
        name: "",
        proficiency: "",
      },
    ],
  },
};

const resumeSlice = createSlice({
  name: "resume",
  initialState: initialState,
  reducers: {
    // RESUME CRUD
    selectResume: (state, action) => {
      state.resume_selected = action.payload;
    },

    setResumes: (state, action) => {
      state.resumes = action.payload;
    },

    insertResume: (state, action) => {
      state.resumes = [action.payload, ...state.resumes];
    },

    updateResume: (state, action) => {
      state.resumes = state.resumes?.map((resume) => {
        if (resume?.id === action.payload?.id) {
          return action.payload;
        } else {
          return resume;
        }
      });
    },

    deleteResume: (state, action) => {
      state.resumes = state.resumes?.filter(
        (resume) => resume?.id !== action.payload?.id
      );
    },

    // RESUME BUILDER CRUD
    // 1. BIOS
    setBios: (state, action) => {
      state.resume_builder.bio = action.payload;
    },

    // 2. PROFILES
    setProfiles: (state, action) => {
      state.resume_builder.profiles = action.payload;
    },
    removeProfile: (state, action) => {
      const currentState = state.resume_builder.profiles;
      const filtered = currentState?.filter(
        (profile) => profile?.id !== action.payload
      );
      state.resume_builder.profiles = filtered;
    },

    // 3. EXPERIENCES
    setExperiences: (state, action) => {
      state.resume_builder.experiences = action.payload;
    },
    removeExperience: (state, action) => {
      const currentState = state.resume_builder.experiences;
      const filtered = currentState?.filter(
        (profile) => profile?.id !== action.payload
      );
      state.resume_builder.experiences = filtered;
    },

    // 4. EDUCATIONS
    setEducations: (state, action) => {
      state.resume_builder.educations = action.payload;
    },
    removeEducation: (state, action) => {
      const currentState = state.resume_builder.educations;
      const filtered = currentState?.filter(
        (profile) => profile?.id !== action.payload
      );
      state.resume_builder.educations = filtered;
    },

    // 4. SKILLS
    setSkills: (state, action) => {
      state.resume_builder.skills = action.payload;
    },
    removeSkill: (state, action) => {
      const currentState = state.resume_builder.skills;
      const filtered = currentState?.filter(
        (profile) => profile?.id !== action.payload
      );
      state.resume_builder.skills = filtered;
    },

    // 5. CERTIFICATIONS
    setCertificates: (state, action) => {
      state.resume_builder.certificates = action.payload;
    },
    removeCertificate: (state, action) => {
      const currentState = state.resume_builder.certificates;
      const filtered = currentState?.filter(
        (profile) => profile?.id !== action.payload
      );
      state.resume_builder.certificates = filtered;
    },

    // 6. PROJECTS
    setProjects: (state, action) => {
      state.resume_builder.projects = action.payload;
    },
    removeProject: (state, action) => {
      const currentState = state.resume_builder.projects;
      const filtered = currentState?.filter(
        (profile) => profile?.id !== action.payload
      );
      state.resume_builder.projects = filtered;
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: resumeActions, reducer: resumeReducer } = resumeSlice;

export { resumeActions, resumeReducer };
