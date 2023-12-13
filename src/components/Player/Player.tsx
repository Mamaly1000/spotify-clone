"use client";
import { AppBar } from "@mui/material";
import React, { ReactNode } from "react";
import useGetSongById from "@/hooks/getSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadSong from "@/hooks/useLoadSongURL";
import MainSideBar from "../sidebar/MainSideBar";
import useSongs from "@/hooks/useSongs";
import useLoadImage from "@/hooks/useLoadImage";
import MainSongPlayer from "./MainSongPlayer";
import useLibrary from "@/hooks/useLibrary";
import SidebarDrawer from "../sidebar/SidebarDrawer";
const Player = ({ children }: { children: ReactNode }) => {
  const { songs: Allsongs } = useSongs();
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const imageURL = useLoadImage(song);
  const songURL = useLoadSong(song!);
  const { library } = useLibrary();
  return (
    <AppBar color="secondary" sx={{ top: "auto", bottom: 0 }}>
      <MainSideBar songs={library}>{children}</MainSideBar> 
      <MainSongPlayer
        songs={Allsongs}
        song={song}
        songUrl={songURL}
        key={songURL}
        imageURL={imageURL}
      />
    </AppBar>
  );
};

export default Player;
