import axios from "axios";
import { notify } from "../notification-toaster";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Function to parse a resume using an external API.
 * @param {string} api_key_id - The API key ID.
 * @param {string} user_id - The user ID.
 * @param {string} resume_id - The resume ID.
 * @returns {Promise<object>} - Parsed resume data or an error.
 */
export const resumeAnalyzer = async (reqBody, callback) => {
  const { api_key_id, user_id, resume_id, job_desc } = reqBody;

  try {
    // Make the request
    const response = await axios.post(`${BASE_URL}/analyzer`, {
      api_key_id,
      user_id,
      resume_id,
      job_desc,
    });
    const { error, message, data: scoreData } = response.data;

    if (response.status == 200) {
      notify("success", message);
      // SUCCESS CALLBACK
      callback && callback(true, scoreData);
    } else if (response.status == 503) {
      callback && callback(false);
      notify("error", message);
    } else if (response.status == 501) {
      callback && callback(false);
      notify("error", message);
    } else {
      callback && callback(false);
      notify("error", error, message);
    }
  } catch ({ error, message }) {
    callback && callback(false);
    console.error(error, message);
    notify("error", `Oops! ${error} Error`, `${message}`);
  }
};
