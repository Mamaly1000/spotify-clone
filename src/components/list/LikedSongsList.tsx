"use client";
import React, { useEffect } from "react";
import SongsList from "./SongsList";
import { Song } from "@/types/song";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Loader from "../loader/Loader";
import useAuthModal from "@/hooks/useAuthModal";
import useLikedSongs from "@/hooks/useLikedSongs";

const LikedSongsList = () => {
  const { likedSongs, loading } = useLikedSongs();
  const { isLoading, user } = useUser();
  const router = useRouter();
  const authmodal = useAuthModal();
  useEffect(() => {
    if (!isLoading && !user) {
      authmodal.onOpen();
    }
  }, [user, isLoading, router, authmodal]);

  return !isLoading || !loading ? <SongsList songs={likedSongs} /> : <Loader />;
};

export default LikedSongsList;
