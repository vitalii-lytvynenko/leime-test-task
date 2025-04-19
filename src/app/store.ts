import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { memesSlice } from "../features/memes";

const rootReducer = combineSlices({
  memes: memesSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;