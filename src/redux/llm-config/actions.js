// ================================================
// REDUX ACTIONS TO UPDATE DATABASE AND LOCAL STATE
// ================================================

import { APIKeyValidator, notify } from "@/utils";
import supabase from "@/supabase";
import { llmConfigActions as actions } from "./slice";

// REDUX ACTION TO CREATE RESUME
export const saveAIConfig = (body, callback) => async (dispatch) => {
  try {
    // CHECKING IF THE API KEY IS VALID
    const { error: geminiError } = await APIKeyValidator(body);

    if (geminiError) throw geminiError;

    // SAVING DATA TO SUPABASE
    body["isValid"] = true;
    const { data, error } = await supabase
      .from("llm_config")
      .upsert({ user_id: body.user_id, ...body }, { onConflict: ["user_id"] })
      .select("id, created_at, user_id, model, name, isValid");

    // THROW ERROR IF ANY
    if (error) throw error;

    // UPDATING REDUX STATE
    dispatch(actions.setLLMConfigs(data[0]));

    // ELSE SHOW SUCCESS MESSAGE
    notify("success", "Gemini AI configured successfully");

    // SUCCESS CALLBACK
    callback && callback(true);
  } catch ({ error, message }) {
    console.log("Error received", { error, message });

    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};
