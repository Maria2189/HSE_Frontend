import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.push(action.payload);
    },
    removeFromFavorite: (state, action) => {
      return state.filter((movie) => movie.filmId !== action.payload);
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;