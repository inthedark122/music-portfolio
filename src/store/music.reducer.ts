import { MusicState, MusicActionTypes, MusicAction } from "./music.types";

function setNextTrack(state: MusicState, nextTrackIndex: number): MusicState {
  const nextTrack = state.album.tracks[nextTrackIndex];

  if (!nextTrack) {
    return state;
  }

  return {
    ...state,
    isDisablePrev: nextTrackIndex === 0,
    isDisabpleNext: nextTrackIndex === state.album.tracks.length,
    currentTrack: nextTrack,
    currentTrackIndex: nextTrackIndex
  };
}

export function musicReducer(
  state: MusicState,
  action: MusicAction
): MusicState {
  switch (action.type) {
    case MusicActionTypes.NEXT_TRACK:
      const nextTrackIndex = state.currentTrackIndex + 1;

      return setNextTrack(state, nextTrackIndex);
    case MusicActionTypes.PREV_TRACK:
      const prevTrackIndex = state.currentTrackIndex - 1;

      return setNextTrack(state, prevTrackIndex);
    default:
      return state;
  }
}
