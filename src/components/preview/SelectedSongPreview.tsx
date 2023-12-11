"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import liked from "@/assets/liked.png";
import LikeButton from "../inputs/LikeButton";
import MainListItem from "../inputs/MainListItem";
import { useRouter } from "next/navigation";
import { MainPic } from "@/assets/pics";
import OrbitFont from "@/fonts/orbit";
import { PlayArrow } from "@mui/icons-material";
import { Song } from "@/types/song";
import usePlayer from "@/hooks/usePlayer";
import CustomButton from "../inputs/Button";
import useLoadImage from "@/hooks/useLoadImage";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import UpComingSong from "./UpComingSong";
const SelectedSongPreview = ({ songs }: { songs?: Song[] | null }) => {
  const player = usePlayer();
  const router = useRouter();
  const authModal = useAuthModal();
  const time = new Date().getHours();
  const { user } = useUser();
  const times = [
    { active: time >= 0 && time <= 12, label: "good morning" },
    { active: time > 12 && time <= 18, label: "good afternoon" },
    { active: time > 18 && time <= 24, label: "good night" },
  ];
  const mainPicHandler = (): string => {
    if (songs && !player.activeId) {
      return useLoadImage(songs[0]) || MainPic.src;
    }
    if (songs && player.activeId) {
      return (
        useLoadImage(songs.find((s) => s.id === player.activeId)) || MainPic.src
      );
    }
    return MainPic.src;
  };
  return (
    <Box
      sx={{
        minWidth: "100%",
        maxWidth: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        minHeight: { xs: "400px", md: "500px" },
        maxHeight: { xs: "fit-content", md: "500px" },

        position: "relative",
        padding: { xs: 1, md: 5 },
        overflowY: { xs: "hidden", md: "hidden" },
        overflowX: "hidden",
        gap: { xs: 2, md: 5 },
        zIndex: "0",
      }}
    >
      <div className="max-w-full absolute aspect-video min-w-full   min-h-[500px] max-h-[500px] md:max-h-none object-contain z-0 bottom-[-10%] start-0 opacity-80 drop-shadow-2xl bg-center">
        <Image
          src={mainPicHandler()}
          alt={"cover image"}
          fill
          className="drop-shadow-2xl rounded-lg z-0 md:object-contain object-cover "
        />
      </div>
      <h1
        className="font-bold capitalize min-w-full text-text text-start text-[4rem] relative z-10 font-orbit"
        style={{
          ...OrbitFont.style,
          textShadow: "0 0 10px var(--text-color)",
        }}
      >
        {times.find((t) => t.active === true)?.label}
      </h1>
      <div className="min-w-full flex flex-wrap items-center justify-start gap-3 relative z-10">
        <MainListItem
          icon={liked.src}
          label="liked songs"
          onclick={() => router.push("/likedsongs")}
          href="/likedsongs"
        />
      </div>
      <div className="min-w-full max-w-full max-h-fit flex items-center md:items-start justify-center md:justify-start relative z-0 ">
        {songs && songs.length > 0 && (
          <div className="min-w-full md:min-w-fit p-5 rounded-lg drop-shadow-2xl flex items-start justify-between gap-5 bg-secondary ">
            <div className=" flex flex-col justify-center items-center md:justify-start  md:items-start gap-2 capitalize">
              <Typography component="h4" fontSize={15} style={OrbitFont.style}>
                {player.activeId
                  ? songs.find((s) => s.id === player.activeId)?.title
                  : songs[0].title}
              </Typography>
              <Typography component="h5" fontSize={14}>
                {player.activeId
                  ? songs.find((s) => s.id === player.activeId)?.singer
                  : songs[0].singer}
              </Typography>
            </div>
            <div className=" flex items-center justify-center md:justify-start md:items-start gap-4 ">
              <CustomButton
                sx={{ background: "var(--primary-color) !important" }}
                buttonType="icon"
                className="animate-pulse bg-primary"
                onClick={() => {
                  if (user) {
                    if (!!!player.activeId) {
                      player.setId(songs[0].id);
                      player.setIds(songs.map((s) => s.id));
                    } else {
                      player.setId(player.activeId);
                    }
                  } else {
                    authModal.onOpen();
                  }
                }}
              >
                <PlayArrow />
              </CustomButton>
              <LikeButton
                song={
                  player.activeId
                    ? songs.find((s) => s.id === player.activeId)
                    : songs[0]
                }
              />
            </div>
          </div>
        )}
      </div>
      {songs && songs.length > 0 && (
        <div className="w-full rounded-lg backdrop-blur-sm drop-shadow-2xl md:w-fit flex items-center justify-center static md:absolute end-5 bottom-5 ">
          <UpComingSong
            song={
              player.activeId
                ? songs?.find((s) => s.id === player.activeId)
                : songs[0]
            }
            songs={songs}
            title="next song"
          />
        </div>
      )}
    </Box>
  );
};

export default SelectedSongPreview;
