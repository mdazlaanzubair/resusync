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
  console.log("data", body);
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
  console.log("data", body);
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
