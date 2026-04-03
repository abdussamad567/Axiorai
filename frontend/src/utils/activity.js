import { supabase } from "../supabase";

export const logActivity = async (action) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("AxiorAI").insert([
    {
      user_id: user.id,
      action,
    },
  ]);
};