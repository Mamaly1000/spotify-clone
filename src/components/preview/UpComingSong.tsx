import { Divider } from "@mui/material";
import React from "react";
import SongCard from "../card/SongCard";
import { Song } from "@/types/song";
import OrbitFont from "@/fonts/orbit";

const UpComingSong = ({
  title,
  song,
  songs,
}: {
  title: string;
  song?: Song | null;
  songs?: Song[] | null;
}) => {
  const displaySong = (song: Song, songs: Song[]): Song => {
    const currentIndex = songs.findIndex((s) => s.id === song.id);
    const nextSong = songs![currentIndex! + 1] as Song;
    if (nextSong) {
      return nextSong;
    } else {
      return songs[0];
    }
  };

  return (
    <div className="min-w-full md:min-w-[40%] min-h-[300px] max-h-[500px] rounded-lg drop-shadow-2xl p-4 flex flex-col justify-center items-center md:justify-start md:items-start gap-3">
      <h3
        className="text-[.9rem] md:text-[1.2rem] font-bold font-orbit capitalize min-w-full text-center md:text-start"
        style={OrbitFont.style}
      >
        {title}
      </h3>
      <Divider color="primary" />
      {song && songs && (
        <SongCard song={displaySong(song, songs)} songs={songs} />
      )}
    </div>
  );
};

export default UpComingSong;
