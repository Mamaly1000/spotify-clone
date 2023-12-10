import { Song } from "@/types/song";
import React from "react";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import toast from "react-hot-toast";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authmodal = useAuthModal();
  const { user } = useUser();
  const onPlay = (song: Song) => {
    if (!user) {
      toast.error("please login to your account");
      return authmodal.onOpen();
    }
    if (user) {
      player.setId(song.id);
      player.setIds(songs.map((song) => song.id));
    }
  };
  return onPlay;
};

export default useOnPlay;
