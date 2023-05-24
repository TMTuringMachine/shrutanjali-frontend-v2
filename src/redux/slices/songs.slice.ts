import { Slice, createSlice } from "@reduxjs/toolkit";

interface SongState {
  featuredSongs: any[];
  allSongs: any[];
  dadajiSongs: any[];
}

const initialState: SongState = {
  featuredSongs: [],
  allSongs: [],
  dadajiSongs: [],
};

const slice: Slice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setFeaturedSongs(state, action) {
      state.featuredSongs = action.payload;
      return state;
    },
    setAllSongs(state, action) {
      state.allSongs = action.payload;
      return state;
    },
    setDadajiSongs(state, action) {
      state.dadajiSongs = action.payload;
      return state;
    },
  },
});

export const { setFeaturedSongs, setAllSongs, setDadajiSongs } = slice.actions;

export default slice.reducer;
