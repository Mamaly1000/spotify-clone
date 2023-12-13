import { Song } from "@/types/song";
import React, { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

const useLikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();

  const getLikedSings = async () => {
    setLoading(true);
    const supabase = createClientComponentClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data: likedSongs, error: likedSongsError } = await supabase
      .from("liked_songs")
      .select("*, songs(*)")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false });

    if (likedSongsError) {
      toast.error("failed to fetch your liked songs");
      console.log(likedSongsError.message);
      return [];
    }
    if (!likedSongs) {
      return [];
    }
    return (
      (likedSongs as any).map((data: { songs: any }) => ({ ...data.songs })) ||
      []
    );
  };

  useEffect(() => {
    if (!mounted && user) {
      getLikedSings()
        .then((res) => {
          setLikedSongs(res);
          setMounted(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return { likedSongs, loading };
};

export default useLikedSongs;
