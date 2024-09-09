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
    dispatch(actions.insertResume(data[0]));

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