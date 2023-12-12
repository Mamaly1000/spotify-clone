"use client";
import { Song } from "@/types/song";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const useLibrary = () => {
  const [library, setLibrary] = useState<Song[]>([]);
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const getSongsByID = async () => {
    const supabase = createClientComponentClient();

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.log(sessionError.message);
      return [];
    }

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", sessionData.session?.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error.message);
    }

    return (data as any) || [];
  };
  useEffect(() => {
    if (user && !mounted) {
      setMounted(true);
      getSongsByID().then((res: Song[]) => {
        setLibrary(res);
      });
    }
  }, [user]);
  return { library };
};

export default useLibrary;
