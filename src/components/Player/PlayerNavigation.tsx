import { Slider, Stack } from "@mui/material";
import React from "react";
import CustomButton from "../inputs/Button";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { PauseRounded, PlayArrow } from "@mui/icons-material";
import LikeButton from "../inputs/LikeButton";
import { Song } from "@/types/song";
import { twMerge } from "tailwind-merge";

const PlayerNavigation = ({
  onNext,
  onPrev,
  handlePlay,
  isPlaying,
  song,
  displayLike = false,
  disabled,
}: {
  disabled: "unloaded" | "loading" | "loaded";

  displayLike?: boolean;
  song?: Song | null;
  isPlaying: boolean;
  onNext: () => void;
  onPrev: () => void;
  handlePlay: () => void;
}) => {
  return (
    <Stack
      display="flex"
      alignItems={"center"}
      gap={2}
      justifyContent={"space-between"}
      flexDirection={"row"}
    >
      <CustomButton onClick={onPrev} buttonType="icon" aria-label="previous">
        <SkipPreviousIcon />
      </CustomButton>
      <CustomButton
        sx={{ background: "var(--primary-color) !important" }}
        buttonType="icon"
        color="primary"
        className={twMerge(
          disabled !== "loaded" ? "animate-pulse" : "animate-none"
        )}
        onClick={() => {
          handlePlay();
        }}
      >
        {isPlaying ? (
          <PauseRounded />
        ) : (
          <PlayArrow color="primary" sx={{ fill: "#ffffff !important" }} />
        )}
      </CustomButton>
      <CustomButton onClick={onNext} buttonType="icon" aria-label="next">
        <SkipNextIcon />
      </CustomButton>
      {displayLike && <LikeButton song={song} />}
    </Stack>
  );
};

export default PlayerNavigation;
