import React from "react";
import { MusicState, MusicAction } from "./store/music.types";
import { initMusicState } from "./store/music.initial";

export interface MusicContextValue {
  dispatch(action: MusicAction): void;
  musicState: MusicState;
}

export const MusicContext = React.createContext<MusicContextValue>({
  dispatch: () => {},
  musicState: initMusicState
});
