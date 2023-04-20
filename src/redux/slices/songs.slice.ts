import { Slice, createSlice } from "@reduxjs/toolkit";

interface SongState {
  featuredSongs: any[];
}

const initialState: SongState = {
  featuredSongs: [],
};

const slice: Slice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setFeaturedSongs(state, action) {
      state.featuredSongs = action.payload;
      return state;
    },
  },
});

export const { setFeaturedSongs } = slice.actions;

export default slice.reducer;
