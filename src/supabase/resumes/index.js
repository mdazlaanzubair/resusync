import supabase from "@/supabase";
const BUCKET_KEY = import.meta.env.VITE_SUPABASE_BUCKET_KEY;

export const createResume = async (data) => {
  return await supabase.from("resumes").insert(data).select();
};
