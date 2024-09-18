// ================================================
// REDUX ACTIONS TO UPDATE DATABASE AND LOCAL STATE
// ================================================

import { notify } from "@/utils";
import supabase from "@/supabase";
import { reportActions as actions } from "./slice";

// REDUX ACTION TO FETCH AI SCORES OF ALL RESUMES
export const getScores = (userId, callback) => async (dispatch) => {
  try {
    // SAVING DATA TO SUPABASE
    const { data, error } = await supabase
      .from("resume_score")
      .select("*, resumes(*)")
      .eq("user_id", userId);

    // THROW ERROR IF ANY
    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.setScores(data));

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};

// REDUX ACTION TO FETCH AI TOKEN USAGE OF USER
export const getAIUsage = (modelId, callback) => async (dispatch) => {
  try {
    // SAVING DATA TO SUPABASE
    const { data, error } = await supabase
      .from("usage_history")
      .select("*, resumes(*)")
      .eq("model_id", modelId);

    // THROW ERROR IF ANY
    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.setUsage(data));

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};
