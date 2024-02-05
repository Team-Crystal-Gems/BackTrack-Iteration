import { configureStore } from "@reduxjs/toolkit";
import { topTracksReducer, topAlbumsReducer, topArtistsReducer, chosenReducer } from '../features/slice.js';
import authReducer from "../features/authSlice.js";

const store = configureStore({
  reducer: {
    topTracks: topTracksReducer.reducer,
    topAlbums: topAlbumsReducer.reducer,
    topArtists: topArtistsReducer.reducer,
    chosen: chosenReducer,
    auth: authReducer
  },
  // devTools: process.env.NODE_ENV !== 'production',
});

export const logState = (store) => {
  console.log('store:', store.getState());

  // useful when the store is small
  // console.log('State:', JSON.stringify(store.getState(), null, 2));
}

export default store;
