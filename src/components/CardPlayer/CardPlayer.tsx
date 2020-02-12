import React, { useContext, useState, useRef, useEffect } from "react";
import { useStyles } from "./CardPlayer.styles";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia
} from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { MusicContext } from "../../contexts";
import { MusicActionTypes } from "../../store/music.types";

export const CardPlayer = () => {
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { musicState, dispatch: dispatchMusicState } = useContext(MusicContext);
  const {
    album,
    currentTrack: track,
    isDisablePrev,
    isDisabpleNext
  } = musicState;
  const classes = useStyles();

  const handlePlayStopClick = () => {
    setIsPlay((prevIsPlay: boolean) => !prevIsPlay);
  };

  const handleNextPlay = () => {
    dispatchMusicState({ type: MusicActionTypes.NEXT_TRACK });
    setIsPlay(false);
  };

  const handlePrevPlay = () => {
    dispatchMusicState({ type: MusicActionTypes.PREV_TRACK });
    setIsPlay(false);
  };

  useEffect(() => {
    if (isPlay) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlay]);

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {track.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {album.artist.name}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton
            aria-label="previous"
            onClick={handlePrevPlay}
            disabled={isDisablePrev}
          >
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="play/pause" onClick={handlePlayStopClick}>
            {isPlay ? (
              <PauseIcon className={classes.playIcon} />
            ) : (
              <PlayArrowIcon className={classes.playIcon} />
            )}
          </IconButton>
          <IconButton
            aria-label="next"
            onClick={handleNextPlay}
            disabled={isDisabpleNext}
          >
            <SkipNextIcon />
          </IconButton>
        </div>
        <audio
          key={track.preview}
          controls
          ref={audioRef}
          className={classes.audio}
        >
          <source src={track.preview} type="audio/mpeg" />
        </audio>
      </div>
      <CardMedia
        className={classes.cover}
        image={album.cover}
        title={album.title}
      />
    </Card>
  );
};
