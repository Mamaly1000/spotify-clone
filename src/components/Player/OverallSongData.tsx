import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import cover from "@/assets/cover.jpg";
import { Song } from "@/types/song";

const OverallSongData = ({
  imageURL,
  song,
}: {
  imageURL: string | null;
  song?: Song | null;
}) => {
  return (
    song && (
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"start"}
        gap={2}
        sx={{
          display: {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            
          }}
        >
          <Typography fontSize={15} fontWeight={700} component="h4">
            {song.title}
          </Typography>
          <Typography fontSize={14} component="h5">
            {song.singer}
          </Typography>
        </Box>
      </Stack>
    )
  );
};

export default OverallSongData;
