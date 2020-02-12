import { MusicState } from "./music.types";
import { albumes } from "./music.mock";

export const initMusicState: MusicState = {
  albumes,
  album: albumes[0],
  isDisabpleNext: false,
  isDisablePrev: true,
  currentTrack: albumes[0].tracks[0],
  currentTrackIndex: 0
};
