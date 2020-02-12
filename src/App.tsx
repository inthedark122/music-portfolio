import React, { useReducer } from "react";
import { musicReducer } from "./store/music.reducer";
import { MusicContextValue, MusicContext } from "./contexts";
import { Header } from "./components/Header/Header";
import { CardPlayer } from "./components/CardPlayer/CardPlayer";
import { initMusicState } from "./store/music.initial";
import { Box, CssBaseline } from "@material-ui/core";

export const App = () => {
  const [musicState, dispatchMusicState] = useReducer(
    musicReducer,
    initMusicState
  );
  const musicContextValue = React.useMemo<MusicContextValue>(
    () => ({ dispatch: dispatchMusicState, musicState }),
    [musicState]
  );

  return (
    <MusicContext.Provider value={musicContextValue}>
      <CssBaseline />
      <Box m={4}>
        <Box mb={2}>
          <Header />
        </Box>
        <CardPlayer />
      </Box>
    </MusicContext.Provider>
  );
};
