"use client";
import { Add, Home, MusicNote, Search } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import CustomList from "../list/CustomList";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types/song";
import LibraryCard from "../card/LibraryCard";
import Loader from "../loader/Loader";
import usePlayer from "@/hooks/usePlayer";
import useOnPlay from "@/hooks/useOnPlay";
import useSongs from "@/hooks/useSongs";
import SidebarDrawer from "./SidebarDrawer";

const MainSideBar = ({
  children,
  songs,
}: {
  children: ReactNode;
  songs?: Song[] | null;
}) => {
  const { style } = useSongs();
  const router = useRouter();
  const player = usePlayer();
  const pathname = usePathname();
  const onPlay = useOnPlay(songs!);
  const { user, isLoading } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const [selectedPath, setSelectedPath] = useState("/");
  const routes = useMemo(
    () => [
      {
        label: "Home",
        active: selectedPath === "/",
        href: "/",
        icon: <Home />,
        onClick: () => setSelectedPath("/"),
      },
      {
        label: "Search",
        active: selectedPath.includes("/search"),
        href: "/search",
        onClick: () => setSelectedPath("/search"),
        icon: <Search />,
      },
    ],
    [router, pathname]
  );

  useEffect(() => {
    setSelectedPath(pathname);
  }, [router, pathname]);

  return (
    <Box
      sx={{
        minHeight: {
          xs: "100vh",
          md: player.activeId ? "calc(100vh - 60px) !important" : "100vh",
        },
        maxHeight: {
          xs: "100vh",
          md: player.activeId ? "calc(100vh - 60px) !important" : "100vh",
        },
        overflow: "auto",
        color: "inherit",
        background: "inherit",
        minWidth: "100%",
      }}
      className="grid grid-cols-12 min-w-full overflow-hidden"
    >
      <Box
        sx={{
          minHeight: "100%",
          overflow: "auto",
          color: "inherit",
          position: "relative",
          maxHeight: "80vh",
        }}
        className="bg-secondary col-span-3 p-10  hidden lg:flex items-start justify-start gap-3 flex-col overflow-y-auto"
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
      </Box>
      <SidebarDrawer routes={routes} songs={songs} />
      <Box
        sx={{
          display: "flex",
          minHeight: "content-fit",
          maxHeight: { xs: "100vh", md: player.activeId ? "90vh" : "100vh" },
          overflow: "auto",
          ...style,
          pb: "100px !important",
        }}
        className=" min-w-full col-span-12 lg:col-span-9  "
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainSideBar;
