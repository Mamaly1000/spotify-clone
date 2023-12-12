"use client";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Volume from "./Volume";
import { Song } from "@/types/song";
import { User } from "@supabase/auth-helpers-nextjs";
import LikeButton from "../inputs/LikeButton";
import useLoadImage from "@/hooks/useLoadImage";
import cover from "@/assets/cover.jpg";
import PlayerNavigation from "./PlayerNavigation";

const PlayerContent = ({
  song,
  songURL,
  user,
  onNext,
  onPrev,
  imageURL,
  handlePlay,
  isPlaying,
  toggleVolume,
  volume,
  setVol,
  volUp,
  disabled,
}: {
  disabled: "unloaded" | "loading" | "loaded";
  volUp: () => void;
  volume: number;
  isPlaying: boolean;
  handlePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  song: Song;
  songURL: string;
  user: User | null;
  imageURL: string | null;
  toggleVolume: () => void;
  setVol: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <Stack
      display="flex"
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{
        minWidth: "100%",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 5 },
      }}
    >
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"start"}
        gap={2}
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Avatar
          src={imageURL || cover.src}
          sx={{
            minWidth: 45,
            maxWidth: 45,
            minHeight: 45,
            maxHeight: 45,
            borderRadius: 1,
          }}
        />
        <Typography fontSize={15} component="h4">
          {song.title}
        </Typography>
        /{" "}
        <Typography fontSize={14} component="h5">
          {song.singer}
        </Typography>
        <LikeButton className="mr-2" song={song} />
      </Stack>
      <PlayerNavigation
        handlePlay={handlePlay}
        onNext={onNext}
        onPrev={onPrev}
        isPlaying={isPlaying}
        displayLike
        song={song}
        disabled={disabled}
      />
      <Volume
        volUp={volUp}
        toggleVolume={toggleVolume}
        value={volume}
        onChange={(vol) => setVol(vol)}
      />
    </Stack>
  );
};

export default PlayerContent;
