"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CustomButton from "../inputs/Button";
import { PlayArrow, PlaylistRemoveRounded } from "@mui/icons-material";
import { Song } from "@/types/song";
import { twMerge } from "tailwind-merge";
import { Box } from "@mui/material";
import SongCard from "../card/SongCard";
import PlayerNavigation from "./PlayerNavigation";
import Volume from "./Volume";
import OverallSongData from "./OverallSongData";

export default function BottomPlayerDrawer({
  songs,
  onNext,
  onPrev,
  volume,
  setVol,
  toggleVolume,
  song,
  isPlaying,
  handlePlay,
  disable,
  volUp,
  disabled,
  imageURL,
}: {
  disabled: "unloaded" | "loading" | "loaded";
  volUp: () => void;
  disable: boolean;
  handlePlay: () => void;
  isPlaying: boolean;
  song: Song;
  toggleVolume: () => void;
  volume: number;
  setVol: (vol: number) => void;
  onNext: () => void;
  onPrev: () => void;
  songs: Song[];
  imageURL: string | null;
}) {
  const [state, setState] = React.useState(false);
  return (
    <Box sx={{ display: { md: "none" } }}>
      <CustomButton
        className={twMerge(
          "fixed bottom-5 start-3 z-[300000] bg-secondary border-[1px] rounded-lg drop-shadow-2xl border-primary hover:bg-secondary hover:scale-105 transition-all",
          disable ? "animate-pulse" : "animate-none"
        )}
        sx={{
          border: "1px solid var(--primary-color) !important",
        }}
        onClick={() => setState((prev) => !prev)}
      >
        <OverallSongData imageURL={imageURL} song={song} />
        <Box
          sx={{
            width: "20px",
            height: "20px",
            padding: 1,
            position: "absolute",
            top: "-10px",
            right: "-10px",
          }}
          className="rounded-full bg-primary flex items-center justify-center"
        >
          <PlayArrow
            sx={{ color: "#ffffff !important" }}
            className="w-[12px] h-[12px]  animate-pulse"
          />
        </Box>
      </CustomButton>

      <Drawer
        sx={{
          "& >.MuiPaper-root": {
            background: "var(--secondary-color)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            color: "var(--text-color)",
            py: 5,
            maxHeight: "500px",
            overflow: "auto",
          },
        }}
        anchor={"bottom"}
        open={state}
        onClose={() => setState(false)}
      >
        <SongCard song={song} songs={songs} displayActions={false} />
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
          toggleVolume={toggleVolume}
          value={volume}
          onChange={(vol) => setVol(vol)}
          volUp={volUp}
        />
      </Drawer>
    </Box>
  );
}
