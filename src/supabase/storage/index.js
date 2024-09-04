import supabase from "@/supabase";
const BUCKET_KEY = import.meta.env.VITE_SUPABASE_BUCKET_KEY;

export const uploadFile = async (filepath, file) => {
  const options = {
    cacheControl: "3600",
    upsert: false,
    contentType: "application/pdf",
  };
  return await supabase.storage
    .from(`${BUCKET_KEY}`)
    .upload(`${filepath}`, file, options);
};

export const getAllFiles = async (username) => {
  const options = {
    limit: 5,
    offset: 0,
    sortBy: {
      column: "name",
      order: "asc",
    },
  };

  return await supabase.storage
    .from(`${BUCKET_KEY}`)
    .list(`${username}`, options);
};

export const downloadFile = async (filepath) => {
  return await supabase.storage.from(`${BUCKET_KEY}`).download(`${filepath}`);
};

export const deleteFile = async (filepath) => {
  return await supabase.storage.from(`${BUCKET_KEY}`).remove([`${filepath}`]);
};
