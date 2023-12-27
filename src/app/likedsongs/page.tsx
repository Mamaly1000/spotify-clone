import React from "react";
import OrbitFont from "@/fonts/orbit";
import Image from "next/image";
import liked from "@/assets/liked.png";
import LikedSongsList from "@/components/list/LikedSongsList";
import CustomHeader from "../(site)/Header";
import { Metadata } from "next";
import fav from "@/app/favicon.ico";

export const metadata: Metadata = {
  title: "Your Liked Songs!",
  description: "begin a great musical adventure with us.",
  icons: fav.src,
};

const LikedSongs = () => {
  return (
    <div className="relative min-w-full max-w-full flex flex-col items-start justify-start  min-h-screen   max-h-fit">
      <CustomHeader />
      <div className="min-w-full flex items-center justify-start gap-5 flex-col md:flex-row p-5">
        <div className="relative aspect-video min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px]  rounded-lg drop-shadow-2xl ">
          <Image
            src={liked.src}
            alt="liked songs playlist"
            fill
            className="rounded-lg drop-shadow-2xl"
          />
        </div>
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-1 capitalize">
          <span className="text-[1.2rem] font-bold">playlist</span>
          <h1
            style={{ ...OrbitFont.style, textShadow: "0 0 10px #ffffff" }}
            className="font-bold font-orbit capitalize text-[2.5rem]  "
          >
            Your Liked Songs
          </h1>
        </div>
      </div>
      <LikedSongsList />
    </div>
  );
};

export default LikedSongs;
