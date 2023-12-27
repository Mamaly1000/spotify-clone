"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/song";
import { Card, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import cover from "@/assets/cover.jpg";
import CustomButton from "../inputs/Button";
import { PlayArrow } from "@mui/icons-material";

const LibraryCard = ({
  song,
  onClick,
}: {
  onClick: () => void;
  song: Song;
}) => {
  const [image, setImage] = useState(cover.src);
  const imageUrl = useLoadImage(song);
  useEffect(() => {
    if (!!imageUrl) {
      setImage(imageUrl);
    }
  }, [song, imageUrl, image]);

  return (
    <Card
      sx={{
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        background: "var(--secondary-color)",
        borderRadius: "5px",
        ":hover": {
          background: song?.color_theme,
        },
        cursor: "pointer",
        position: "relative",
      }}
      className="drop-shadow-2xl group"
    >
      <div className="flex p-0 m-0 items-center justify-start gap-5">
        <div className="relative aspect-video min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px]">
          <Image
            alt={song?.title || ""}
            src={image}
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-[120px] text-text line-clamp-2 flex flex-col items-start justify-start gap-2 capitalize">
          <h4 className="text-[.8rem] font-bold font-orbit capitalize flex-nowrap">
            {song?.title.split(" ").slice(0, 2).join(" ")+" ..."}
          </h4>
          <h5 className="text-[.75rem] font-light">{song?.singer}</h5>
        </div>
      </div>
      <CustomButton
        className="group-hover:scale-100 scale-0 transition-all float-right absolute end-2"
        buttonType="icon"
        onClick={onClick}
      >
        <PlayArrow />
      </CustomButton>
    </Card>
  );
};

export default LibraryCard;
