import supabase from "@/supabase";

export const createResume = async (data) => {
  return await supabase.from("resumes").insert(data).select();
};

export const getAllResume = async (userId) => {
  return await supabase.from("resumes").select("*").eq("user_id", userId);
};
