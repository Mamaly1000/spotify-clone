"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CSSProperties, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Song } from "@/types/song";
import usePlayer from "./usePlayer";
const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [theme, setTheme] = useState<string | null | undefined>("");
  const player = usePlayer();

  const getSongs = async () => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
      console.log(error);
    }
    return !!data ? (data as any) : [];
  };

  useEffect(() => {
    getSongs().then((res) => {
      setSongs(res);
      setTheme(res[0].color_theme || "");
    });
  }, []);

  useEffect(() => {
    if (player.activeId && songs) {
      setTheme(songs.find((s) => s.id === player.activeId)!.color_theme);
    }
  }, [player.activeId, songs]);

  const style = {
    background: !!theme
      ? theme.length <= 20
        ? `linear-gradient( to bottom ,${theme} 40%,var(--background-color) 100%)`
        : theme
      : `linear-gradient( to bottom ,var(--primary-color) 40%,var(--background-color) 100%)`,
  } as CSSProperties;

  return {
    songs,
    theme,
    style,
  };
};

export default useSongs;
