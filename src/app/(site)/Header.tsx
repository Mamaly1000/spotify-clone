"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { CssBaseline, Slide, useScrollTrigger } from "@mui/material";
import OrbitFont from "@/fonts/orbit";
import { SpotifyIcon } from "@/assets/pics";
import { StyledMenu } from "@/styles/Menu";
import CustomMenu from "@/components/menu/CustomMenu";
import {
  AppRegistration,
  AppRegistrationOutlined,
  Dashboard,
  Login,
  Logout,
} from "@mui/icons-material";
import CustomButton from "@/components/inputs/Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import useSidebarDrawer from "@/hooks/useSidebarDrawer";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function CustomHeader(_props: any) {
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const sidebar = useSidebarDrawer();
  const supabaseClient = useSupabaseClient();
  const { user, isLoading } = useUser();
  const { onOpen } = useAuthModal();
  const player = usePlayer();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      router.refresh();
      player.reset();
      toast.success(`${user?.email} logged out successfuly`);
    }
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = React.useMemo(
    () =>
      !!user
        ? [
            {
              label: "Logout",
              icon: <Logout sx={{ color: "var(--text-color) !important" }} />,
              fn: () => {
                handleLogout();
              },
            },
            {
              label: "Library",
              icon: (
                <ViewSidebarIcon
                  sx={{ color: "var(--text-color) !important" }}
                />
              ),
              fn: () => {
                sidebar.onOpen();
              },
            },
          ]
        : [
            {
              label: "SignIn",
              icon: <Login sx={{ color: "var(--text-color) !important" }} />,
              fn: () => {
                onOpen();
              },
            },
            {
              label: "Library",
              icon: (
                <ViewSidebarIcon
                  sx={{ color: "var(--text-color) !important" }}
                />
              ),
              fn: () => {
                sidebar.onOpen();
              },
            },
          ],
    [user]
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar
          position="sticky"
          sx={{ background: "var(--secondary-color)", top: 0 }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ justifyContent: { md: "space-between" } }}
            >
              <Box sx={{ display: "flex", mr: 1 }}>
                <img src={SpotifyIcon.src} className="w-[50px] h-[50px]" />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: "flex",
                  flexGrow: 1,
                  fontFamily: OrbitFont.style.fontFamily,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                }}
              >
                Spotify
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
                <CustomButton
                  buttonType="icon"
                  onClick={!!!isLoading ? handleOpenUserMenu : undefined}
                  className={`${isLoading ? "animate-pulse" : "animate-none"}`}
                >
                  <Avatar alt="Remy Sharp" />
                </CustomButton>
                <CustomMenu
                  sx={{ mt: "45px" }}
                  anchorElUser={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  handleCloseUserMenu={handleCloseUserMenu}
                  Routes={settings}
                />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}
export default CustomHeader;
