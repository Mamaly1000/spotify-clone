"use client";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types/song";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import BottomPlayerDrawer from "./BottomPlayerDrawer";
import { Toolbar } from "@mui/material";
import PlayerContent from "./PlayerContent";
import { Howl } from "howler"; 
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
  const [playerOptions, setPlayerOptions] = useState({
    playing: false,
    loaded: false,
    loop: false,
    mute: false,
    volume: 1,
    seek: 0.0,
    rate: 1,
    isSeeking: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    duration: 0,
  });
  const { user } = useUser();
  const player = usePlayer();
  const sound = useMemo(() => {
    return new Howl({
      src: [songUrl],
      onplay: () => {
        setPlayerOptions({ ...playerOptions, playing: true, mute: false });
      },
      onpause: () => {
        setPlayerOptions({ ...playerOptions, playing: false, mute: true });
      },
      onend: () => {
        onPlayNext();
      },
      onload: () => {
        sound.play();
      },
      onmute: () => {
        setPlayerOptions({ ...playerOptions, volume: 0 });
      },
      volume: playerOptions.volume,
      html5: true,
    });
  }, [songUrl]);
  const handlePlay = () => {
    if (!playerOptions.playing) {
      sound.play();
    } else {
      sound.pause();
    }
  };
  const toggleVolume = () => {
    setPlayerOptions({
      ...playerOptions,
      volume: playerOptions.volume ? 0 : 1,
    });
    sound.volume(playerOptions.volume ? 0 : 1);
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
    if (!playerOptions.mute) {
      sound.play();
    }
    return () => {
      sound?.unload();
    };
  }, [sound, playerOptions.mute]);
  return (
    <Fragment>
      {songs && songs.length > 0 && !!song && (
        <BottomPlayerDrawer
          songs={songs}
          disable={false}
          song={song}
          onNext={onPlayNext}
          onPrev={onPlayPrevious}
          handlePlay={handlePlay}
          imageURL={imageURL}
          isPlaying={playerOptions.playing}
          setVol={(vol) => setPlayerOptions({ ...playerOptions, volume: vol })}
          toggleVolume={toggleVolume}
          volume={playerOptions.volume}
          volUp={toggleVolume}
          disabled={sound.state()}
        />
      )}
      {!!player.activeId && (
        <Toolbar
          sx={{
            maxHeight: !!player.activeId ? "45px" : "0px",
            display: { xs: "none", md: "flex" },
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 199999,
          }}
        >
          {song && (
            <PlayerContent
              song={song}
              songURL={songUrl}
              user={user}
              onNext={onPlayNext}
              onPrev={onPlayPrevious}
              handlePlay={handlePlay}
              imageURL={imageURL}
              isPlaying={playerOptions.playing}
              setVol={(vol) =>
                setPlayerOptions({ ...playerOptions, volume: vol })
              }
              toggleVolume={toggleVolume}
              volume={playerOptions.volume}
              volUp={toggleVolume}
              disabled={sound.state()}
            />
          )}
        </Toolbar>
      )}
    </Fragment>
  );
};

export default MainSongPlayer;
