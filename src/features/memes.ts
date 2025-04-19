import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Meme } from "../types";

interface MemesState {
  memes: Meme[];
}

const initialState: MemesState = {
  memes: [],
};

export const memesSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    setMemes: (state, action: PayloadAction<Meme[]>) => {
      state.memes = action.payload;
    },
    updateMeme: (state, action: PayloadAction<Meme>) => {
      const index = state.memes.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.memes[index] = action.payload;
      }
    },
  },
});

export const { setMemes, updateMeme } = memesSlice.actions;