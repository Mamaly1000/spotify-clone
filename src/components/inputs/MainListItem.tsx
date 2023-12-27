import { PlayArrow } from "@mui/icons-material";
import { Avatar, Icon, Typography } from "@mui/material";
import Link from "next/link";

import React from "react";
import { twMerge } from "tailwind-merge";

const MainListItem = ({
  icon,
  label,
  onclick,
  className,
  href,
}: {
  href?: string;
  icon?: any;
  label?: string;
  onclick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}) => {
  return (
    <Link
      href={`${href}`}
      className={twMerge(
        `w-full md:w-fit h-[50px] md:h-[60px] drop-shadow-2xl border-[1px] border-text cursor-pointer bg-secondary overflow-hidden text-text capitalize no-underline group relative p-0 m-0 flex items-center justify-between gap-2 rounded-sm hover:text-primary hover:border-primary pe-3 transition-all`,
        className
      )}
    >
      <>
        <Avatar
          sx={{
            minHeight: "100%",
            minWidth: { xs: "50px", md: "60px" },
            borderRadius: 0,
          }}
          src={icon}
        />
        <Typography
          marginInlineStart={2}
          onClick={onclick}
          minWidth={100}
          color="inherit"
          noWrap
        >
          {label}
        </Typography>
      </>

      <div className="bg-primary text-text rounded-full flex items-center justify-center w-[40px] h-[40px] md:w-[45px] md:h-[45px] drop-shadow-2xl scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 me-2">
        <PlayArrow />
      </div>
    </Link>
  );
};

export default MainListItem;
