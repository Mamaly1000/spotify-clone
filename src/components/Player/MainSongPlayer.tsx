import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types/song";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import BottomPlayerDrawer from "./BottomPlayerDrawer";
import { Toolbar } from "@mui/material";
import PlayerContent from "./PlayerContent";
import { Howl } from "howler";
import toast from "react-hot-toast";
const MainSongPlayer = ({
  songs,
  song,
  songUrl,
  imageURL,
}: {
  songs?: Song[] | null;
  song?: Song;
  songUrl: string;
  imageURL: string | null;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVol] = useState(1);
  const [paused, setPaused] = useState(false);
  const { user } = useUser();
  const player = usePlayer();
  let sound = useMemo(() => {
    return new Howl({
      src: [songUrl],
      onend: function () {
        setIsPlaying(false);
        onPlayNext();
        console.log("song end");
      },
      onpause: function () {
        setIsPlaying(false);
        setPaused(true);
        console.log("pause song");
      },
      onplay: () => {
        console.log("song played");
        setIsPlaying(true);
      },
      onplayerror: () => {
        if (songUrl) {
          toast.error("unable to play the song");
        }
      },
      onloaderror: () => {
        if (songUrl) {
          console.error("unable to load sound");
        }
      },
      volume: volume,
      html5: true,
    });
  }, [songUrl, volume]);
  const handlePlay = () => {
    if (!isPlaying) {
      sound.play();
      console.log("handle play with onclick");
    } else {
      sound.pause();
      console.log("handle pause with onclick");
    }
  };
  const toggleVolume = () => {
    setVol(volume === 0 ? 1 : 0);
    sound.volume(volume === 0 ? 1 : 0);
  };
  const volUp = () => {
    sound.volume(1);
  };
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    if (currentIndex + 1 === player.ids.length) {
      player.setId(player.ids[0]);
    } else {
      const nextIndex = player.ids[currentIndex + 1];
      player.setId(nextIndex);
    }
  };
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    if (currentIndex === 0) {
      player.setId(player.ids[player.ids.length - 1]);
    } else {
      const previousIndex = player.ids[currentIndex - 1];
      player.setId(previousIndex);
    }
  };

  useEffect(() => {
    if (!paused) {
      sound.play();
    }
    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <Fragment>
      {songs && songs.length > 0 && !!song && (
        <BottomPlayerDrawer
          onNext={onPlayNext}
          onPrev={onPlayPrevious}
          songs={songs}
          disable={!user && !song}
          handlePlay={handlePlay}
          isPlaying={isPlaying}
          setVol={setVol}
          song={song}
          toggleVolume={toggleVolume}
          volume={volume}
          volUp={volUp}
          imageURL={imageURL}
          disabled={sound.state()}
        />
      )}
      {!!player.activeId && (
        <Toolbar
          sx={{
            maxHeight: !!player.activeId ? "50px" : "0px",
            display: { xs: "none", md: "block" },
          }}
        >
          sddsfdsf
          {song && (
            <PlayerContent
              song={song}
              songURL={songUrl}
              user={user}
              onNext={onPlayNext}
              onPrev={onPlayPrevious}
              handlePlay={handlePlay}
              imageURL={imageURL}
              isPlaying={isPlaying}
              setVol={setVol}
              toggleVolume={toggleVolume}
              volume={volume}
              volUp={volUp}
              disabled={sound.state()}
            />
          )}
        </Toolbar>
      )}
    </Fragment>
  );
};

export default MainSongPlayer;
