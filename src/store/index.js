import { createSlice, configureStore } from "@reduxjs/toolkit";
import QuizSlice from "./QuizSlice";
import HighScoreSlice from "./HighScoreSlice";

const store = configureStore({
  reducer: { quiz: QuizSlice.reducer, highscore: HighScoreSlice.reducer },
});

export const quizActions = QuizSlice.actions;
export const highScoreActions = HighScoreSlice.actions;

export default store;
