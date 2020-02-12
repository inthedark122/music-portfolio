export interface Track {
  id: number;
  title: string;
  link: string;
  preview: string;
}

export interface Genre {
  id: number;
  name: string;
  picture: string;
  type: string;
}

export interface Artist {
  id: number;
  name: string;
  picture: string;
}

export interface Album {
  title: string;
  link: string;
  cover: string;
  genres: Genre[];
  artist: Artist;
  tracks: Track[];
}

export enum MusicActionTypes {
  NEXT_TRACK,
  PREV_TRACK
}

export interface MusicState {
  albumes: Album[];
  isDisabpleNext: boolean;
  isDisablePrev: boolean;
  currentTrack: Track;
  currentTrackIndex: number;
  album: Album;
}

export interface MusicAction {
  type: MusicActionTypes;
}
