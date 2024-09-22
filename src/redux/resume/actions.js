// ================================================
// REDUX ACTIONS TO UPDATE DATABASE AND LOCAL STATE
// ================================================

import { notify } from "@/utils";
import supabase from "@/supabase";
import { resumeActions as actions } from "./slice";
const BUCKET_KEY = import.meta.env.VITE_SUPABASE_BUCKET_KEY;

// REDUX ACTION TO UPLOAD RESUME FILE TO SUPABASE STORAGE
export const uploadResume = (body, callback) => async (dispatch) => {
  try {
    const options = {
      cacheControl: "3600",
      upsert: false,
      contentType: "application/pdf",
    };

    // SAVING DATA TO SUPABASE STORAGE
    const { data: storageData, error: storageError } = await supabase.storage
      .from(`${BUCKET_KEY}`)
      .upload(`${body?.file_path}`, body?.file, options);

    // THROW ERROR IF ANY
    if (storageError) {
      throw storageError;
    }

    // ELSE SAVE UPLOADED RESUME DATA TO SUPABASE
    // SAVING RESUME DATA TO THE TABLE
    delete body?.file;
    const { data, error: resumeError } = await supabase
      .from("resumes")
      .insert(body)
      .select();

    // THROW ERROR IF ANY
    if (resumeError) {
      // IF ERROR OCCURRED DURING SAVING OF RESUME DATA
      // THE FILE RECENTLY UPLOADED WILL BE DELETED
      await supabase.storage
        .from(`${BUCKET_KEY}`)
        .remove([`${body?.file_path}`]);

      throw resumeError;
    }

    // UPDATING REDUX STATE
    dispatch(actions.insertResume(data[0]));

    // ELSE SHOW SUCCESS MESSAGE
    notify(
      "success",
      "Upload Successfully",
      "You file is uploaded to the cloud successfully"
    );

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// FUNCTION TO DOWNLOAD FILE FROM SUPABASE STORAGE
export const handleDownload = async (filePath, fileName, callback) => {
  try {
    // Fetch file from Supabase storage
    const { data, error } = await supabase.storage
      .from(`${BUCKET_KEY}`)
      .download(filePath); // The path of the file to download

    if (error) {
      throw error;
    }

    // Create a Blob URL from the fetched file
    const blobUrl = window.URL.createObjectURL(data);

    // Create a temporary <a> tag to trigger download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileName); // The file name for the download
    document.body.appendChild(link);
    link.click();

    // Clean up the URL and remove the <a> tag
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    callback && callback();
  } catch (error) {
    callback && callback();
    console.error(error);
    notify("error", `An error occurred while downloading`, `${error}`);
  }
};

// REDUX ACTION TO CREATE RESUME
export const createResume = (body, callback) => async (dispatch) => {
  try {
    // SAVING DATA TO SUPABASE
    const { data, error } = await supabase
      .from("resumes")
      .insert(body)
      .select();

    // THROW ERROR IF ANY
    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.insertResume(data[0]));

    // ELSE SHOW SUCCESS MESSAGE
    notify("success", "Resume created successfully");

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO FETCH RESUMES
export const getAllResumes = (userId, callback) => async (dispatch) => {
  try {
    // SAVING DATA TO SUPABASE
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    // THROW ERROR IF ANY
    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.setResumes(data));

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO UPDATE RESUME
export const updateResume = (body, callback) => async (dispatch) => {
  try {
    // SAVING DATA TO SUPABASE
    const { data, error } = await supabase
      .from("resumes")
      .update(body)
      .eq("id", body?.id)
      .select();

    // THROW ERROR IF ANY
    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.updateResume(data[0]));

    // ELSE SHOW SUCCESS MESSAGE
    notify("success", "Resume updated successfully");

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO DELETE RESUME
export const deleteResume = (body, callback) => async (dispatch) => {
  try {
    // SAVING DATA TO SUPABASE
    const { data, error } = await supabase
      .from("resumes")
      .delete()
      .eq("id", body?.id)
      .select();

    // THROW ERROR IF ANY
    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.deleteResume(data[0]));

    // ELSE SHOW SUCCESS MESSAGE
    notify("success", "Resume delete successfully");

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// ============================================================================
// RESUME BUILDER ACTIONS
// ============================================================================

// REDUX ACTION TO SAVE BIOS
export const getBioData = (resume_id, callback) => async (dispatch) => {
  try {
    // SAVING DATA TO SUPABASE
    const { data, error } = await supabase
      .from("bios")
      .select()
      .eq("resume_id", resume_id);

    // THROW ERROR IF ANY
    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.setBios(data[0]));

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE BIOS
export const saveBioData = (body, callback) => async (dispatch) => {
  try {
    // SAVING DATA TO SUPABASE
    const { data, error } = await supabase
      .from("bios")
      .upsert(
        { resume_id: body.resume_id, ...body },
        { onConflict: ["resume_id"] }
      )
      .select();

    // THROW ERROR IF ANY
    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.setBios(data[0]));

    // ELSE SHOW SUCCESS MESSAGE
    notify("success", "Bio data saved successfully");

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE BIOS
export const getProfileData = (resume_id, callback) => async (dispatch) => {
  try {
    // SAVING DATA TO SUPABASE
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("resume_id", resume_id);

    // THROW ERROR IF ANY
    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.setProfiles(data));

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE PROFILES
// TO AVOID THE SUPABASE UPSERT NULL ERROR ON CONFLICT FIELD
// THIS FUNCTION WILL RECEIVE TWO BODIES ONE WITH "id" FIELDS
// ANOTHER BY EXPLICITLY REMOVED "id" KEYS
export const saveProfileData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      // SAVING/UPDATING DATA WITH "id" FIELD TO SUPABASE
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("profiles")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        // THROW ERROR IF ANY
        if (error) throw error;

        // APPENDING DATA ON SUCCESS
        updatedData = [...updatedData, ...data];
      }

      // SAVING NEW DATA WITHOUT "id" FIELD TO SUPABASE
      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("profiles")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        // THROW ERROR IF ANY
        if (error) throw error;

        // APPENDING DATA ON SUCCESS
        updatedData = [...updatedData, ...data];
      }

      // UPDATING REDUX STATE
      dispatch(actions.setProfiles(updatedData));

      // ELSE SHOW SUCCESS MESSAGE
      notify("success", "Profiles data saved successfully");

      // SUCCESS CALLBACK
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE PROFILE
export const deleteProfileData = (id, callback) => async (dispatch) => {
  try {
    // DELETE PROFILE FROM SUPABASE
    const { error } = await supabase.from("profiles").delete().eq("id", id);

    // THROW ERROR IF ANY
    if (error) throw error;

    // REMOVE PROFILE FROM REDUX STATE
    dispatch(actions.removeProfile(id));

    // SUCCESS CALLBACK
    callback && callback(true);
    notify("success", "Profile deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET EXPERIENCES
export const getExperienceData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("experiences")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setExperiences(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE EXPERIENCES
export const saveExperienceData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("experiences")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("experiences")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setExperiences(updatedData));
      notify("success", "Experience data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE EXPERIENCE
export const deleteExperienceData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase.from("experiences").delete().eq("id", id);

    if (error) throw error;

    dispatch(actions.removeExperience(id));
    callback && callback(true);
    notify("success", "Experience deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET EDUCATION
export const getEducationData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("educations")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setEducations(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE EDUCATION
export const saveEducationData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("educations")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("educations")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setEducations(updatedData));
      notify("success", "Education data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE EDUCATION
export const deleteEducationData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase.from("educations").delete().eq("id", id);

    if (error) throw error;

    dispatch(actions.removeEducation(id));
    callback && callback(true);
    notify("success", "Education deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET SKILLS
export const getSkillData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setSkills(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE SKILLS
export const saveSkillData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("skills")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("skills")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setSkills(updatedData));
      notify("success", "Skill data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE SKILLS
export const deleteSkillData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (error) throw error;

    dispatch(actions.removeSkill(id));
    callback && callback(true);
    notify("success", "Skill deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET CERTIFICATE
export const getCertificateData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("certifications")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setCertificates(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE CERTIFICATE
export const saveCertificateData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("certifications")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("certifications")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setCertificates(updatedData));
      notify("success", "Certificate data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE CERTIFICATE
export const deleteCertificateData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase
      .from("certifications")
      .delete()
      .eq("id", id);

    if (error) throw error;

    dispatch(actions.removeCertificate(id));
    callback && callback(true);
    notify("success", "Certificate deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET AWARDS
export const getAwardData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("awards")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setAwards(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE AWARDS
export const saveAwardData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("awards")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("awards")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setAwards(updatedData));
      notify("success", "Award data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE AWARDS
export const deleteAwardData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase.from("awards").delete().eq("id", id);

    if (error) throw error;

    dispatch(actions.removeAward(id));
    callback && callback(true);
    notify("success", "Award deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET PROJECTS
export const getProjectData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setProjects(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE PROJECTS
export const saveProjectData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("projects")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("projects")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setProjects(updatedData));
      notify("success", "Project data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE PROJECTS
export const deleteProjectData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;

    dispatch(actions.removeProject(id));
    callback && callback(true);
    notify("success", "Project deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET PUBLICATIONS
export const getPublicationData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("publications")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setPublications(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE PUBLICATIONS
export const savePublicationData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("publications")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("publications")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setPublications(updatedData));
      notify("success", "Publication data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE PUBLICATIONS
export const deletePublicationData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase.from("publications").delete().eq("id", id);

    if (error) throw error;

    dispatch(actions.removePublication(id));
    callback && callback(true);
    notify("success", "Publication deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET REFERENCES
export const getReferenceData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("references")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setReferences(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE REFERENCES
export const saveReferenceData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("references")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("references")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setReferences(updatedData));
      notify("success", "Reference data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE REFERENCES
export const deleteReferenceData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase.from("references").delete().eq("id", id);

    if (error) throw error;

    dispatch(actions.removeReference(id));
    callback && callback(true);
    notify("success", "Reference deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET VOLUNTEERS
export const getVolunteerData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("volunteers")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setVolunteers(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE VOLUNTEERS
export const saveVolunteerData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("volunteers")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("volunteers")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setVolunteers(updatedData));
      notify("success", "Volunteer data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE VOLUNTEER
export const deleteVolunteerData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase.from("volunteers").delete().eq("id", id);

    if (error) throw error;

    dispatch(actions.removeVolunteer(id));
    callback && callback(true);
    notify("success", "Volunteer deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET INTERESTS
export const getInterestData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("interests")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setInterests(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE INTERESTS
export const saveInterestData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("interests")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("interests")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setInterests(updatedData));
      notify("success", "Interest data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE INTERESTS
export const deleteInterestData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase.from("interests").delete().eq("id", id);

    if (error) throw error;

    dispatch(actions.removeInterest(id));
    callback && callback(true);
    notify("success", "Interest deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO GET LANGUAGES
export const getLanguageData = (resume_id, callback) => async (dispatch) => {
  try {
    const { data, error } = await supabase
      .from("languages")
      .select()
      .eq("resume_id", resume_id);

    if (error) throw error;

    dispatch(actions.setLanguages(data));
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO SAVE LANGUAGES
export const saveLanguageData =
  (bodyWithId, bodyWithoutId, callback) => async (dispatch) => {
    let updatedData = [];

    try {
      if (bodyWithId?.length > 0) {
        const { data, error } = await supabase
          .from("languages")
          .upsert(bodyWithId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      if (bodyWithoutId?.length > 0) {
        const { data, error } = await supabase
          .from("languages")
          .upsert(bodyWithoutId, { onConflict: ["id"] })
          .select();

        if (error) throw error;
        updatedData = [...updatedData, ...data];
      }

      dispatch(actions.setLanguages(updatedData));
      notify("success", "Language data saved successfully");
      callback && callback(true);
    } catch ({ error, message }) {
      callback && callback(false);
      console.error(error, message);
      notify("error", `Oops! ${error} Error`, `${message}`);
    }
  };

// REDUX ACTION TO DELETE LANGUAGES
export const deleteLanguageData = (id, callback) => async (dispatch) => {
  try {
    const { error } = await supabase.from("languages").delete().eq("id", id);

    if (error) throw error;

    dispatch(actions.removeLanguage(id));
    callback && callback(true);
    notify("success", "Language deleted successfully");
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};
