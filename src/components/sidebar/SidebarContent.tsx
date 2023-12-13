import React from "react";
import CustomList from "../list/CustomList";
import { Add, Home, MusicNote, Search } from "@mui/icons-material";
import LibraryCard from "../card/LibraryCard";
import Loader from "../loader/Loader";
import { Typography } from "@mui/material";
import usePlayer from "@/hooks/usePlayer";
import useSidebarDrawer from "@/hooks/useSidebarDrawer";
import { usePathname } from "next/navigation";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types/song";

const SidebarContent = ({
  songs,
  routes,
}: {
  routes: {
    label: string;
    active: boolean;
    href: string;
    icon: React.JSX.Element;
    onClick: () => void;
  }[];
  songs?: Song[] | null;
}) => {
  const player = usePlayer();
  const sidebar = useSidebarDrawer();
  const pathname = usePathname();
  const onPlay = useOnPlay(songs!);
  const { user, isLoading } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal(); 
  return (
    <div>
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
    </div>
  );
};

export default SidebarContent;
