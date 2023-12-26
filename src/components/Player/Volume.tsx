import * as React from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { IconButton } from "@mui/material";

export default function Volume({
  value,
  onChange,
  toggleVolume,
  volUp,
}: {
  volUp: () => void;
  toggleVolume: () => void;
  value: number;
  onChange: (value: number) => void;
}) {
  const [vol, setVol] = React.useState(value * 100);
  React.useEffect(() => {
    setVol(value * 100);
  }, [value]);
  return (
    <Stack
      minWidth={200}
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{ color: "var(--text-color) !important" }}
    >
      <IconButton color="inherit" onClick={toggleVolume}>
        <VolumeDown />
      </IconButton>
      <Slider
        aria-label="Volume"
        color="primary"
        value={vol}
        max={100}
        min={0}
        valueLabelDisplay={"auto"}
      />
      <IconButton
        color="inherit"
        onClick={() => {
          volUp();
          onChange(1);
        }}
      >
        <VolumeUp />
      </IconButton>
    </Stack>
  );
}
