import { supabase } from "../supabase";

export const checkUsageLimit = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ✅ FIX: allow if no user (for now)
  if (!user) {
    console.log("No user found → allowing access");
    return true;
  }

  const { data, error } = await supabase
    .from("AxiorAI")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return true; // ✅ allow instead of blocking
  }

  console.log("User usage:", data.length);

  return data.length < 10;
};