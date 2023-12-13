"use client";
import * as React from "react";
import { Box, Drawer } from "@mui/material";
import { Song } from "../../types/song";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import SidebarContent from "./SidebarContent";
import useSidebarDrawer from "@/hooks/useSidebarDrawer";
import CustomButton from "@/components/inputs/Button";
import { Close } from "@mui/icons-material";
const SidebarDrawer = ({
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
  const sidebar = useSidebarDrawer();

  return (
    <Box sx={{ display: { md: "none" } }} position={"fixed"} zIndex={3000}>
      <CustomButton
        onClick={() => sidebar.onOpen()}
        buttonType="icon"
        className="fixed top-[75px] end-[40px]"
      >
        <ViewSidebarIcon />
      </CustomButton>
      <Drawer
        anchor={"left"}
        open={sidebar.isOpen}
        onClose={() => sidebar.onClose()}
        sx={{
          background: "rgba(0 0 0 /.4)",
          "& > .MuiPaper-root": {
            background: "var(--secondary-color)",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            gap: 2,
            color: "var(--text-color)",
            py: 5,
            overflow: "auto",
            px: 5,
          },
        }}
        id="sidebar-drawer"
      >
        <Box className="min-w-full flex items-center justify-end py-2  ">
          <CustomButton buttonType="icon" onClick={() => sidebar.onClose()}>
            <Close />
          </CustomButton>
        </Box>
        <SidebarContent routes={routes} songs={songs} />
      </Drawer>
    </Box>
  );
};

export default SidebarDrawer;
