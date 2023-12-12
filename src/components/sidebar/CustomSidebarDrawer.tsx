"use client";
import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import usePlayer from "@/hooks/usePlayer";
import { usePathname } from "next/navigation";
import useOnPlay from "@/hooks/useOnPlay";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import Home from "@/app/(site)/page";
import { Add, MusicNote, Search } from "@mui/icons-material";
import CustomList from "../list/CustomList";
import LibraryCard from "../card/LibraryCard";
import { Box, Drawer, Typography } from "@mui/material";
import { Song } from "../../types/song";
import { useUser } from "@/hooks/useUser";
import Loader from "../loader/Loader";
import useSidebarDrawer from "@/hooks/useSidebarDrawer";
import CustomButton from "../inputs/Button";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";

export default function CustomSidebarDrawer({
  songs,
}: {
  songs?: Song[] | null;
}) {
  const [display, setDisplay] = React.useState(false);
  const player = usePlayer();
  const sidebar = useSidebarDrawer();
  const pathname = usePathname();
  const onPlay = useOnPlay(songs!);
  const { user, isLoading } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const routes = React.useMemo(
    () => [
      {
        label: "Home",
        active: pathname !== "/search",
        href: "/",
        icon: <Home />,
      },
      {
        label: "Search",
        active: pathname === "/search",
        href: "/search",
        icon: <Search />,
      },
    ],
    []
  );
  return (
    <Box   sx={{ display: { md: "none" } }}>
      <CustomButton
        onClick={() => setDisplay(true)}
        buttonType="icon"
        className="fixed top-[60px] end-5"
      >
        <ViewSidebarIcon />
      </CustomButton>
      <Drawer
        anchor={"left"}
        open={display}
        onClose={() => setDisplay(false)}
        sx={{
          background: "rgba(0 0 0 /.4)",
          "& >.MuiPaper-root": {
            background: "var(--secondary-color)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            color: "var(--text-color)",
            py: 5,
            minHeight: "100vh !important",
            maxHeight: "100vh !important",
            minWidth: "300px !important",
            maxWidth: "300px !important",
            overflow: "auto",
          },
          position: "fixed !important",
        }}
      >
        <CustomList routes={routes} />
        <CustomList
          title={{
            text: "your libraries",
            icon: <MusicNote />,
            action: {
              onClick: () => {
                if (!!!user) {
                  authModal.onOpen();
                } else {
                  uploadModal.onOpen();
                }
              },
              icon: <Add />,
              disable: isLoading,
            },
          }}
        >
          {songs &&
            songs?.map((song) => (
              <LibraryCard
                onClick={() => {
                  if (song && songs) {
                    onPlay(song);
                  }
                }}
                song={song}
                key={song.id}
              />
            ))}
          {isLoading && <Loader message="loading your library" />}
          {!songs ||
            (!user && !isLoading && (
              <Typography fontSize={15} textTransform={"capitalize"}>
                you have to login to have access to your library{" "}
              </Typography>
            ))}
        </CustomList>
      </Drawer>
    </Box>
  );
}
