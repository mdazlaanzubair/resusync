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
    experience: [
      {
        company: "",
        position: "",
        location: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    education: [
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
    certificate: [
      {
        title: "",
        issuer: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    project: [
      {
        name: "",
        date: "",
        summary: "",
        keywords: [],
        url: "",
      },
    ],
    award: [
      {
        title: "",
        awarder: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    publication: [
      {
        name: "",
        publisher: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    reference: [
      {
        name: "",
        designation: "",
        email: "",
        phone: "",
      },
    ],
    volunteer: [
      {
        organization: "",
        role: "",
        location: "",
        date: "",
        summary: "",
        url: "",
      },
    ],
    interest: [
      {
        title: "",
        keywords: [],
        url: "",
      },
    ],
    skill: [
      {
        name: "",
        level: 0,
        keywords: [],
        url: "",
      },
    ],
    language: [
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
    // BIOS
    setBios: (state, action) => {
      state.resume_builder.bio = action.payload;
    },
    // PROFILES
    setProfiles: (state, action) => {
      state.resume_builder.profiles = action.payload;
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: resumeActions, reducer: resumeReducer } = resumeSlice;

export { resumeActions, resumeReducer };
